import React, { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { api } from './services/api';
import './App.css';

interface PriceHistory {
  timestamp: string;
  [key: string]: number | string;
}

function App() {
  const [stocks, setStocks] = useState<any>({});
  const [priceHistory, setPriceHistory] = useState<PriceHistory[]>([]);
  const [selectedSymbol, setSelectedSymbol] = useState<string>('AAPL');

  useEffect(() => {
    loadStocks();
    const ws = new WebSocket('ws://localhost:3000');
    
    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === 'update') {
        setStocks(data.data);
        
        // Add to price history
        const timestamp = new Date().toLocaleTimeString();
        setPriceHistory(prev => {
          const newEntry: PriceHistory = { timestamp };
          Object.keys(data.data).forEach(symbol => {
            newEntry[symbol] = data.data[symbol].price;
          });
          return [...prev.slice(-20), newEntry];
        });
      } else if (data.type === 'init') {
        setStocks(data.data);
      }
    };

    return () => ws.close();
  }, []);

  const loadStocks = async () => {
    try {
      const response = await api.getStocks();
      setStocks(response.data);
    } catch (error) {
      console.error('Error loading stocks:', error);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>React Trading Charts</h1>
        <p>Real-time stock price visualization</p>
      </header>

      <div className="content">
        <div className="stock-selector">
          <h2>Select Stock</h2>
          <div className="stock-buttons">
            {Object.keys(stocks).map(symbol => (
              <button
                key={symbol}
                className={selectedSymbol === symbol ? 'active' : ''}
                onClick={() => setSelectedSymbol(symbol)}
              >
                {symbol}
              </button>
            ))}
          </div>
        </div>

        <div className="chart-container">
          <h2>Price Chart - {selectedSymbol}</h2>
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={priceHistory}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="timestamp" />
              <YAxis domain={['auto', 'auto']} />
              <Tooltip />
              <Legend />
              <Line 
                type="monotone" 
                dataKey={selectedSymbol} 
                stroke="#8884d8" 
                activeDot={{ r: 8 }} 
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="current-prices">
          <h2>Current Prices</h2>
          <div className="prices-grid">
            {Object.entries(stocks).map(([symbol, data]: [string, any]) => (
              <div key={symbol} className="price-card">
                <h3>{data.name}</h3>
                <p className="symbol">{symbol}</p>
                <p className="price">${data.price?.toFixed(2)}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
