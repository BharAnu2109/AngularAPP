# Trading Application - Multi-Framework Platform

A comprehensive trading application built with Angular, React, Vue.js, and Node.js, designed for deployment on Google Cloud Platform (GCP).

## 🏗️ Architecture

This application demonstrates a microservices architecture with:

- **Backend**: Node.js/Express REST API with WebSocket support for real-time data
- **Angular Frontend**: Trading dashboard for order management
- **React Frontend**: Real-time stock price charts and visualization
- **Vue Frontend**: Portfolio management and position tracking

## 📁 Project Structure

```
├── backend/              # Node.js REST API and WebSocket server
├── angular-frontend/     # Angular trading dashboard
├── react-frontend/       # React charting application
├── vue-frontend/         # Vue portfolio manager
├── docker-compose.yml    # Local development orchestration
└── cloudbuild.yaml       # GCP Cloud Build configuration
```

## 🚀 Features

### Backend (Node.js)
- RESTful API for stock data and order management
- WebSocket server for real-time price updates
- In-memory data storage (can be extended with databases)
- CORS-enabled for frontend integration
- Health check endpoint

### Angular Frontend
- Complete trading dashboard
- Stock listing with real-time prices
- Order placement (Buy/Sell)
- Portfolio overview
- Order history

### React Frontend
- Real-time stock price charts using Recharts
- WebSocket integration for live data
- Interactive stock selection
- Price history visualization

### Vue Frontend
- Portfolio summary and statistics
- Position tracking with P&L calculation
- Real-time portfolio value updates
- Clean, responsive UI

## 🛠️ Trading Scenarios

The application supports complex trading scenarios:

1. **Market Orders**: Buy/sell stocks at current market price
2. **Portfolio Management**: Track positions, average cost, and P&L
3. **Real-time Updates**: Live price feeds via WebSocket
4. **Order History**: Complete audit trail of all transactions
5. **Multi-asset Trading**: Support for multiple stocks (AAPL, GOOGL, MSFT, AMZN, TSLA)

## 📋 Prerequisites

- Node.js 18.x or higher
- npm or yarn
- Docker and Docker Compose (for containerized deployment)
- Google Cloud SDK (for GCP deployment)

## 🏃 Local Development

### 1. Start Backend

```bash
cd backend
npm install
npm start
# Backend runs on http://localhost:3000
```

### 2. Start Angular Frontend

```bash
cd angular-frontend
npm install
npm start
# Angular app runs on http://localhost:4200
```

### 3. Start React Frontend

```bash
cd react-frontend
npm install
npm start
# React app runs on http://localhost:3001
```

### 4. Start Vue Frontend

```bash
cd vue-frontend
npm install
npm run dev
# Vue app runs on http://localhost:5173
```

## 🐳 Docker Deployment

Run all services with Docker Compose:

```bash
docker-compose up --build
```

Access the applications:
- Backend API: http://localhost:3000
- Angular Dashboard: http://localhost:4200
- React Charts: http://localhost:3001
- Vue Portfolio: http://localhost:8080

## ☁️ GCP Deployment

### Prerequisites
1. Create a GCP project
2. Enable required APIs:
   - Cloud Build API
   - Cloud Run API
   - Container Registry API

### Deploy with Cloud Build

```bash
# Set your GCP project
gcloud config set project YOUR_PROJECT_ID

# Submit build
gcloud builds submit --config cloudbuild.yaml
```

This will:
1. Build Docker images for all services
2. Push images to Google Container Registry
3. Deploy services to Cloud Run

### Access Deployed Services

After deployment, Cloud Run will provide URLs for each service:
- Backend: https://trading-backend-[hash]-uc.a.run.app
- Angular: https://angular-frontend-[hash]-uc.a.run.app
- React: https://react-frontend-[hash]-uc.a.run.app
- Vue: https://vue-frontend-[hash]-uc.a.run.app

### Alternative: App Engine Deployment

For the backend:

```bash
cd backend
gcloud app deploy app.yaml
```

## 🔌 API Endpoints

### Stock Data
- `GET /api/stocks` - Get all stock prices
- `GET /api/stocks/:symbol` - Get specific stock price

### Orders
- `POST /api/orders` - Place a new order
- `GET /api/orders` - Get all orders
- `GET /api/orders/:id` - Get specific order

### Portfolio
- `GET /api/portfolio` - Get portfolio summary and positions

### WebSocket
- `ws://localhost:3000` - Real-time price updates

## 🧪 Testing

Run tests for each service:

```bash
# Backend
cd backend
npm test

# Angular
cd angular-frontend
npm test

# React
cd react-frontend
npm test

# Vue
cd vue-frontend
npm test
```

## 🔒 Environment Variables

### Backend
```env
PORT=3000
NODE_ENV=development
```

## 📊 Monitoring and Scaling

### GCP Cloud Run Features
- Auto-scaling based on traffic
- Built-in load balancing
- Container-level metrics
- Log aggregation in Cloud Logging

### Configuration
Adjust scaling in `cloudbuild.yaml`:
- Minimum instances
- Maximum instances
- CPU/Memory allocation

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## 📝 License

MIT License - feel free to use this project for learning and development.

## 🎯 Future Enhancements

- [ ] Add database integration (PostgreSQL/Cloud SQL)
- [ ] Implement authentication and user management
- [ ] Add more technical indicators and charts
- [ ] Implement limit orders and stop-loss
- [ ] Add real market data integration
- [ ] Create mobile applications (React Native)
- [ ] Add comprehensive test coverage
- [ ] Implement CI/CD pipeline
- [ ] Add Terraform for infrastructure as code

## 📞 Support

For issues and questions, please create an issue in the GitHub repository.
