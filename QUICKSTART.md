# Quick Start Guide

Get the trading application up and running in minutes!

## Prerequisites

Before you begin, ensure you have:
- Node.js 18.x or higher
- npm 9.x or higher
- Git

## 5-Minute Local Setup

### Step 1: Clone the Repository

```bash
git clone https://github.com/BharAnu2109/AngularAPP.git
cd AngularAPP
```

### Step 2: Start the Backend

```bash
cd backend
npm install
npm start
```

The backend API will start on `http://localhost:3000`

Keep this terminal running and open a new terminal for the next steps.

### Step 3: Test the Backend

Open a new terminal and run:

```bash
curl http://localhost:3000/health
```

You should see: `{"status":"healthy","timestamp":"..."}`

### Step 4: Choose Your Frontend

You can run any or all of the frontends. Each serves a different purpose:

#### Option A: Angular Dashboard (Trading Interface)

```bash
cd angular-frontend
npm install
npm start
```

Visit: `http://localhost:4200`

#### Option B: React Charts (Price Visualization)

```bash
cd react-frontend
npm install
npm start
```

Visit: `http://localhost:3001`

#### Option C: Vue Portfolio (Investment Tracking)

```bash
cd vue-frontend
npm install
npm run dev
```

Visit: `http://localhost:5173`

## Docker Setup (Alternative)

If you have Docker installed, you can run everything with one command:

```bash
docker-compose up --build
```

Access the applications:
- Backend: `http://localhost:3000`
- Angular: `http://localhost:4200`
- React: `http://localhost:3001`
- Vue: `http://localhost:8080`

## What Can You Do?

### 1. View Stock Prices

Visit any frontend to see real-time stock prices for:
- Apple (AAPL)
- Alphabet (GOOGL)
- Microsoft (MSFT)
- Amazon (AMZN)
- Tesla (TSLA)

### 2. Place Orders

Using the Angular Dashboard:
1. Click "Trade" on any stock
2. Select Buy or Sell
3. Enter quantity
4. Submit order

### 3. Track Your Portfolio

Using the Vue Portfolio Manager:
- View your cash balance
- See your positions
- Track profit/loss
- Monitor total value

### 4. Watch Live Charts

Using the React Charts:
- Select a stock
- Watch real-time price updates
- See historical price trends

## API Examples

### Get All Stocks
```bash
curl http://localhost:3000/api/stocks
```

### Get Portfolio
```bash
curl http://localhost:3000/api/portfolio
```

### Place an Order
```bash
curl -X POST http://localhost:3000/api/orders \
  -H "Content-Type: application/json" \
  -d '{
    "symbol": "AAPL",
    "quantity": 10,
    "orderType": "market",
    "side": "buy"
  }'
```

### Get Order History
```bash
curl http://localhost:3000/api/orders
```

## Testing WebSocket

You can test the WebSocket connection using a WebSocket client or browser console:

```javascript
const ws = new WebSocket('ws://localhost:3000');

ws.onopen = () => {
  console.log('Connected to WebSocket');
};

ws.onmessage = (event) => {
  const data = JSON.parse(event.data);
  console.log('Received:', data);
};
```

## Common Issues

### Port Already in Use

If you see an error like "EADDRINUSE" or "port already in use":

```bash
# Find and kill the process using the port
# On Linux/Mac:
lsof -ti:3000 | xargs kill -9

# On Windows:
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

### Node Version Issues

Ensure you're using Node.js 18 or higher:

```bash
node --version
```

If you need to upgrade:
- Use [nvm](https://github.com/nvm-sh/nvm) (Linux/Mac)
- Use [nvm-windows](https://github.com/coreybutler/nvm-windows) (Windows)

### CORS Errors

If you see CORS errors in the browser console:
1. Ensure the backend is running on port 3000
2. Check that the API URL in frontend services matches your backend URL
3. Verify the backend CORS configuration allows your frontend origin

## Next Steps

- Read the [Architecture Guide](ARCHITECTURE.md)
- Check out the [Deployment Guide](DEPLOYMENT.md)
- Explore the [full README](README.md)
- Start customizing the application!

## Trading Scenarios to Try

### Scenario 1: Build a Portfolio
1. Start with $100,000 cash
2. Buy 10 shares of AAPL
3. Buy 5 shares of GOOGL
4. Watch your portfolio value change in real-time

### Scenario 2: Take Profit
1. Wait for stock prices to increase
2. Sell your positions when profitable
3. See your realized gains

### Scenario 3: Multiple Orders
1. Place several buy orders
2. Check order history
3. Monitor all positions in portfolio

### Scenario 4: Monitor Charts
1. Open React frontend
2. Select different stocks
3. Watch price movements over time

## Development Tips

### Hot Reload

All frontends support hot reload:
- Make changes to code
- Save the file
- Browser automatically refreshes

### Backend Development

Use nodemon for auto-restart:

```bash
cd backend
npm install -g nodemon
nodemon server.js
```

### Debugging

#### Backend Logs
The backend logs all requests to the console. Watch for:
- HTTP requests
- WebSocket connections
- Order executions
- Errors

#### Frontend DevTools
- Use browser developer tools (F12)
- Check Console for errors
- Use Network tab for API calls
- Inspect WebSocket frames

## Performance Tips

### Running All Frontends
Running all three frontends simultaneously requires:
- At least 4GB RAM
- Modern CPU
- Fast SSD recommended

If your system is slow:
1. Run only the backend + one frontend
2. Use Docker with resource limits
3. Close other applications

## Learning Resources

### Angular
- [Angular Documentation](https://angular.io/docs)
- [RxJS Guide](https://rxjs.dev/guide/overview)

### React
- [React Documentation](https://react.dev/)
- [Recharts Documentation](https://recharts.org/)

### Vue
- [Vue.js Guide](https://vuejs.org/guide/)
- [Pinia Documentation](https://pinia.vuejs.org/)

### Node.js
- [Node.js Best Practices](https://github.com/goldbergyoni/nodebestpractices)
- [Express Guide](https://expressjs.com/en/guide/routing.html)

## Get Help

If you run into issues:
1. Check the [Common Issues](#common-issues) section
2. Review application logs
3. Create an issue on GitHub
4. Check Stack Overflow

## Success Checklist

- [ ] Backend running on port 3000
- [ ] Health check returns success
- [ ] At least one frontend running
- [ ] Can view stock prices
- [ ] Can place an order
- [ ] Portfolio updates correctly
- [ ] Real-time prices update

Congratulations! You're ready to start trading! 🚀📈
