const express = require('express');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');
const WebSocket = require('ws');
const http = require('http');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

app.use(cors());
app.use(express.json());

// In-memory data storage
let orders = [];
let portfolio = {
  cash: 100000,
  positions: []
};

// Mock stock prices
const stockPrices = {
  'AAPL': { price: 175.50, name: 'Apple Inc.' },
  'GOOGL': { price: 140.25, name: 'Alphabet Inc.' },
  'MSFT': { price: 380.75, name: 'Microsoft Corp.' },
  'AMZN': { price: 145.30, name: 'Amazon.com Inc.' },
  'TSLA': { price: 245.60, name: 'Tesla Inc.' }
};

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'healthy', timestamp: new Date().toISOString() });
});

// Get all stock prices
app.get('/api/stocks', (req, res) => {
  res.json(stockPrices);
});

// Get specific stock price
app.get('/api/stocks/:symbol', (req, res) => {
  const symbol = req.params.symbol.toUpperCase();
  if (stockPrices[symbol]) {
    res.json({ symbol, ...stockPrices[symbol] });
  } else {
    res.status(404).json({ error: 'Stock not found' });
  }
});

// Place order
app.post('/api/orders', (req, res) => {
  const { symbol, quantity, orderType, side } = req.body;
  
  if (!symbol || !quantity || !orderType || !side) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const stock = stockPrices[symbol.toUpperCase()];
  if (!stock) {
    return res.status(404).json({ error: 'Stock not found' });
  }

  const order = {
    id: uuidv4(),
    symbol: symbol.toUpperCase(),
    quantity: parseInt(quantity),
    orderType,
    side,
    price: stock.price,
    total: stock.price * parseInt(quantity),
    status: 'filled',
    timestamp: new Date().toISOString()
  };

  // Update portfolio
  if (side === 'buy') {
    if (portfolio.cash >= order.total) {
      portfolio.cash -= order.total;
      const existingPosition = portfolio.positions.find(p => p.symbol === order.symbol);
      if (existingPosition) {
        existingPosition.quantity += order.quantity;
        existingPosition.avgPrice = ((existingPosition.avgPrice * (existingPosition.quantity - order.quantity)) + (order.price * order.quantity)) / existingPosition.quantity;
      } else {
        portfolio.positions.push({
          symbol: order.symbol,
          quantity: order.quantity,
          avgPrice: order.price
        });
      }
    } else {
      order.status = 'rejected';
      order.reason = 'Insufficient funds';
    }
  } else if (side === 'sell') {
    const position = portfolio.positions.find(p => p.symbol === order.symbol);
    if (position && position.quantity >= order.quantity) {
      portfolio.cash += order.total;
      position.quantity -= order.quantity;
      if (position.quantity === 0) {
        portfolio.positions = portfolio.positions.filter(p => p.symbol !== order.symbol);
      }
    } else {
      order.status = 'rejected';
      order.reason = 'Insufficient shares';
    }
  }

  orders.push(order);
  res.status(201).json(order);
});

// Get all orders
app.get('/api/orders', (req, res) => {
  res.json(orders);
});

// Get order by ID
app.get('/api/orders/:id', (req, res) => {
  const order = orders.find(o => o.id === req.params.id);
  if (order) {
    res.json(order);
  } else {
    res.status(404).json({ error: 'Order not found' });
  }
});

// Get portfolio
app.get('/api/portfolio', (req, res) => {
  const portfolioWithValue = {
    ...portfolio,
    positions: portfolio.positions.map(pos => ({
      ...pos,
      currentPrice: stockPrices[pos.symbol].price,
      marketValue: pos.quantity * stockPrices[pos.symbol].price,
      profitLoss: (stockPrices[pos.symbol].price - pos.avgPrice) * pos.quantity
    })),
    totalValue: portfolio.cash + portfolio.positions.reduce((sum, pos) => 
      sum + (pos.quantity * stockPrices[pos.symbol].price), 0)
  };
  res.json(portfolioWithValue);
});

// Market data streaming via WebSocket
wss.on('connection', (ws) => {
  console.log('Client connected to WebSocket');

  // Send initial prices
  ws.send(JSON.stringify({ type: 'init', data: stockPrices }));

  // Simulate real-time price updates
  const interval = setInterval(() => {
    Object.keys(stockPrices).forEach(symbol => {
      // Random price change between -2% and +2%
      const change = (Math.random() - 0.5) * 0.04;
      stockPrices[symbol].price = parseFloat((stockPrices[symbol].price * (1 + change)).toFixed(2));
    });

    ws.send(JSON.stringify({ type: 'update', data: stockPrices }));
  }, 3000);

  ws.on('close', () => {
    console.log('Client disconnected');
    clearInterval(interval);
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal server error' });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Trading API server running on port ${PORT}`);
});

module.exports = app;
