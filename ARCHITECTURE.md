# Trading Application Architecture

## Overview

This document describes the architecture of the multi-framework trading application deployed on Google Cloud Platform.

## System Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                        Client Layer                              │
├───────────────┬─────────────────┬──────────────────┬────────────┤
│   Angular     │     React       │      Vue         │   Mobile   │
│   Dashboard   │     Charts      │   Portfolio      │   (Future) │
│   Port 4200   │   Port 3001     │   Port 8080      │            │
└───────┬───────┴────────┬────────┴─────────┬────────┴────────────┘
        │                │                  │
        └────────────────┼──────────────────┘
                         │ HTTPS/WSS
                         ▼
        ┌────────────────────────────────┐
        │    Load Balancer (GCP)         │
        │    - SSL/TLS Termination       │
        │    - Traffic Distribution      │
        └────────────┬───────────────────┘
                     │
                     ▼
        ┌────────────────────────────────┐
        │    Backend API (Node.js)       │
        │    - REST API                  │
        │    - WebSocket Server          │
        │    - Business Logic            │
        │    Port 3000                   │
        └────────────┬───────────────────┘
                     │
                     ▼
        ┌────────────────────────────────┐
        │    Data Layer (In-Memory)      │
        │    - Orders                    │
        │    - Portfolio                 │
        │    - Stock Prices              │
        │    (Future: Cloud SQL)         │
        └────────────────────────────────┘
```

## Component Architecture

### Backend (Node.js/Express)

**Responsibilities:**
- REST API endpoints for trading operations
- WebSocket server for real-time price updates
- Order management and execution
- Portfolio tracking and calculations
- Stock price simulation

**Technology Stack:**
- Node.js 18
- Express.js (REST API)
- ws (WebSocket)
- CORS support
- UUID for order IDs

**Endpoints:**
```
GET  /health              - Health check
GET  /api/stocks          - List all stocks
GET  /api/stocks/:symbol  - Get specific stock
POST /api/orders          - Place order
GET  /api/orders          - List orders
GET  /api/orders/:id      - Get specific order
GET  /api/portfolio       - Get portfolio
WS   /                    - WebSocket for real-time updates
```

### Angular Frontend (Trading Dashboard)

**Responsibilities:**
- Interactive trading interface
- Order placement and management
- Portfolio overview
- Real-time price display

**Technology Stack:**
- Angular 20
- TypeScript
- RxJS for reactive programming
- HttpClient for API calls
- Standalone components

**Features:**
- Stock listing with live prices
- Buy/Sell order forms
- Portfolio summary cards
- Order history table
- Responsive design

### React Frontend (Charts & Visualization)

**Responsibilities:**
- Real-time price charts
- Historical price visualization
- Stock selection interface
- WebSocket data streaming

**Technology Stack:**
- React 18
- TypeScript
- Recharts for data visualization
- Axios for HTTP requests
- WebSocket API

**Features:**
- Line charts for price history
- Interactive stock selection
- Real-time data updates
- Responsive grid layout

### Vue Frontend (Portfolio Manager)

**Responsibilities:**
- Portfolio tracking
- Position management
- P&L calculations
- Investment summary

**Technology Stack:**
- Vue 3 (Composition API)
- TypeScript
- Pinia for state management
- Vue Router
- Axios for API calls

**Features:**
- Portfolio summary cards
- Position details table
- Profit/Loss tracking
- Real-time value updates
- Clean, modern UI

## Data Flow

### Order Placement Flow

```
User (Angular) → POST /api/orders → Backend
                                      ↓
                              1. Validate order
                              2. Get stock price
                              3. Check funds/shares
                              4. Execute order
                              5. Update portfolio
                              6. Store order
                                      ↓
                              Order Response → User
```

### Real-time Price Updates Flow

```
Backend (Timer) → Price Update → WebSocket Broadcast
                                      ↓
                    ┌─────────────────┼─────────────────┐
                    ▼                 ▼                 ▼
              React Client      Vue Client        Other Clients
                    ↓                 ↓                 ↓
            Update Charts    Update Portfolio    Update UI
```

### Portfolio Calculation Flow

```
GET /api/portfolio → Backend
                       ↓
              1. Get positions
              2. Get current prices
              3. Calculate market values
              4. Calculate P&L
              5. Calculate total value
                       ↓
              Portfolio Response → User
```

## Deployment Architecture

### Local Development

```
┌─────────────────────────────────────────────┐
│            Docker Compose                    │
├──────────────┬──────────────┬───────────────┤
│   Backend    │   Angular    │   React + Vue │
│   Container  │   Container  │   Containers  │
│   Port 3000  │   Port 4200  │   Various     │
└──────────────┴──────────────┴───────────────┘
         Connected via Docker Bridge Network
```

### Google Cloud Platform (Cloud Run)

```
┌───────────────────────────────────────────────┐
│         Google Cloud Platform                  │
├───────────────────────────────────────────────┤
│  Cloud Build                                   │
│    ├─ Build Docker Images                     │
│    ├─ Push to Container Registry              │
│    └─ Deploy to Cloud Run                     │
├───────────────────────────────────────────────┤
│  Cloud Run Services                            │
│    ├─ trading-backend                         │
│    ├─ angular-frontend                        │
│    ├─ react-frontend                          │
│    └─ vue-frontend                            │
├───────────────────────────────────────────────┤
│  Container Registry (GCR)                      │
│    └─ Docker Images                           │
├───────────────────────────────────────────────┤
│  Cloud Logging & Monitoring                    │
│    ├─ Application Logs                        │
│    ├─ Performance Metrics                     │
│    └─ Error Tracking                          │
└───────────────────────────────────────────────┘
```

### Google Kubernetes Engine (Alternative)

```
┌───────────────────────────────────────────────┐
│              GKE Cluster                       │
├─────────────┬─────────────┬───────────────────┤
│  Node Pool  │  Node Pool  │   Node Pool       │
├─────────────┴─────────────┴───────────────────┤
│  Pods:                                         │
│    ├─ Backend (3 replicas)                    │
│    ├─ Angular (2 replicas)                    │
│    ├─ React (2 replicas)                      │
│    └─ Vue (2 replicas)                        │
├───────────────────────────────────────────────┤
│  Services:                                     │
│    ├─ LoadBalancer Services                   │
│    └─ Internal Services                       │
├───────────────────────────────────────────────┤
│  Ingress Controller                            │
│    └─ Route Traffic to Services               │
└───────────────────────────────────────────────┘
```

## Security Architecture

### Authentication (Future)
- JWT-based authentication
- OAuth 2.0 providers (Google, GitHub)
- Session management
- Refresh tokens

### Authorization
- Role-based access control (RBAC)
- User permissions
- API key authentication

### Data Security
- HTTPS/TLS encryption
- Secure WebSocket (WSS)
- Environment variables for secrets
- GCP Secret Manager integration

### Network Security
- CORS configuration
- Rate limiting
- DDoS protection
- Cloud Armor (GCP)

## Scalability

### Horizontal Scaling
- Cloud Run: Auto-scaling based on traffic
- GKE: Horizontal Pod Autoscaler
- Load balancing across instances

### Vertical Scaling
- Adjustable resource limits
- Memory and CPU allocation
- Container optimization

### Performance Optimization
- CDN for static assets (Cloud CDN)
- Caching strategies (Redis)
- Database connection pooling
- Response compression

## Monitoring & Observability

### Metrics
- Request latency
- Error rates
- CPU/Memory usage
- Active connections
- Order volume

### Logging
- Application logs
- Access logs
- Error logs
- Audit trails

### Alerting
- Error rate thresholds
- Performance degradation
- Resource utilization
- Service availability

### Tracing
- Request flow tracking
- Distributed tracing
- Performance profiling

## Future Enhancements

### Phase 1: Data Persistence
- Cloud SQL (PostgreSQL)
- Data migration
- Backup strategies

### Phase 2: Advanced Features
- Real market data integration
- Advanced order types (limit, stop-loss)
- Technical indicators
- Trading algorithms

### Phase 3: Enterprise Features
- Multi-user support
- Team collaboration
- Audit logging
- Compliance reporting

### Phase 4: Mobile & Analytics
- React Native apps
- Trading analytics
- Machine learning insights
- Predictive models

## Development Workflow

```
Developer → Git Push → GitHub
                         ↓
                  GitHub Actions
                         ↓
                  Run Tests
                         ↓
                  Build Images
                         ↓
                  Push to GCR
                         ↓
                  Deploy to GCP
                         ↓
              Production Environment
```

## Technology Decisions

### Why Node.js for Backend?
- Excellent WebSocket support
- JSON-native
- Event-driven architecture
- Large ecosystem
- Easy deployment

### Why Multiple Frontends?
- Demonstrate polyglot architecture
- Showcase different frameworks
- Team flexibility
- Specialized use cases

### Why GCP?
- Excellent container support (Cloud Run, GKE)
- Integrated CI/CD (Cloud Build)
- Managed services
- Cost-effective scaling
- Global infrastructure

## References

- [Node.js Best Practices](https://github.com/goldbergyoni/nodebestpractices)
- [Angular Architecture](https://angular.io/guide/architecture)
- [React Patterns](https://reactpatterns.com/)
- [Vue.js Guide](https://vuejs.org/guide/)
- [Google Cloud Architecture Framework](https://cloud.google.com/architecture/framework)
