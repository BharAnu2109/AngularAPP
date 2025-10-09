# Deployment Guide for Trading Application

## Table of Contents
1. [Local Development Setup](#local-development-setup)
2. [Docker Deployment](#docker-deployment)
3. [Google Cloud Platform Deployment](#gcp-deployment)
4. [Production Considerations](#production-considerations)

## Local Development Setup

### Prerequisites
- Node.js 18.x or higher
- npm 9.x or higher
- Git

### Step-by-Step Setup

#### 1. Clone Repository
```bash
git clone https://github.com/BharAnu2109/AngularAPP.git
cd AngularAPP
```

#### 2. Backend Setup
```bash
cd backend
npm install
cp .env.example .env
npm start
```

The backend will start on `http://localhost:3000`

#### 3. Angular Frontend Setup
```bash
cd ../angular-frontend
npm install
npm start
```

The Angular app will start on `http://localhost:4200`

#### 4. React Frontend Setup
```bash
cd ../react-frontend
npm install
npm start
```

The React app will start on `http://localhost:3001`

#### 5. Vue Frontend Setup
```bash
cd ../vue-frontend
npm install
npm run dev
```

The Vue app will start on `http://localhost:5173`

## Docker Deployment

### Prerequisites
- Docker 20.x or higher
- Docker Compose 2.x or higher

### Build and Run

```bash
# Build all images
docker-compose build

# Start all services
docker-compose up

# Start in detached mode
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

### Access Services
- Backend: http://localhost:3000
- Angular: http://localhost:4200
- React: http://localhost:3001
- Vue: http://localhost:8080

## GCP Deployment

### Prerequisites

1. **Google Cloud Account**
   - Create account at https://cloud.google.com/
   - Create a new project or select existing one

2. **Install Google Cloud SDK**
   ```bash
   # macOS
   brew install google-cloud-sdk
   
   # Linux
   curl https://sdk.cloud.google.com | bash
   
   # Windows
   # Download installer from https://cloud.google.com/sdk/docs/install
   ```

3. **Initialize gcloud**
   ```bash
   gcloud init
   gcloud auth login
   gcloud config set project YOUR_PROJECT_ID
   ```

### Enable Required APIs

```bash
# Enable necessary APIs
gcloud services enable cloudbuild.googleapis.com
gcloud services enable run.googleapis.com
gcloud services enable containerregistry.googleapis.com
gcloud services enable appengine.googleapis.com
```

### Deployment Options

#### Option 1: Cloud Run (Recommended)

Cloud Run provides automatic scaling and pay-per-use pricing.

```bash
# Deploy using Cloud Build
gcloud builds submit --config cloudbuild.yaml

# After deployment, get service URLs
gcloud run services list --platform managed
```

**Configure Environment Variables:**
```bash
# For backend service
gcloud run services update trading-backend \
  --set-env-vars "NODE_ENV=production" \
  --region us-central1
```

#### Option 2: App Engine

For the backend service:

```bash
cd backend
gcloud app deploy app.yaml
```

#### Option 3: Google Kubernetes Engine (GKE)

For production workloads requiring more control:

```bash
# Create cluster
gcloud container clusters create trading-cluster \
  --num-nodes=3 \
  --zone=us-central1-a

# Get credentials
gcloud container clusters get-credentials trading-cluster \
  --zone=us-central1-a

# Deploy services
kubectl apply -f kubernetes/
```

### Post-Deployment Configuration

#### 1. Update Frontend API URLs

After backend deployment, update the API URLs in frontends:

**Angular** (`angular-frontend/src/app/services/trading.service.ts`):
```typescript
private apiUrl = 'https://trading-backend-[hash]-uc.a.run.app/api';
```

**React** (`react-frontend/src/services/api.ts`):
```typescript
const API_BASE_URL = 'https://trading-backend-[hash]-uc.a.run.app/api';
```

**Vue** (`vue-frontend/src/services/api.ts`):
```typescript
const API_BASE_URL = 'https://trading-backend-[hash]-uc.a.run.app/api';
```

#### 2. Redeploy Frontends

```bash
# Rebuild and redeploy with updated URLs
gcloud builds submit --config cloudbuild.yaml
```

#### 3. Configure CORS

Update backend CORS settings if using custom domains:

```javascript
// backend/server.js
app.use(cors({
  origin: [
    'https://your-angular-domain.com',
    'https://your-react-domain.com',
    'https://your-vue-domain.com'
  ]
}));
```

### Custom Domain Setup

#### 1. Map Custom Domain to Cloud Run

```bash
gcloud run domain-mappings create \
  --service angular-frontend \
  --domain angular.yourdomain.com \
  --region us-central1
```

#### 2. Configure DNS

Add DNS records as instructed by the domain mapping command.

### SSL/TLS Configuration

Cloud Run automatically provides SSL certificates for custom domains.

## Production Considerations

### Security

1. **Environment Variables**
   - Never commit `.env` files
   - Use Secret Manager for sensitive data
   ```bash
   # Create secret
   echo -n "your-secret-value" | gcloud secrets create my-secret --data-file=-
   
   # Use in Cloud Run
   gcloud run services update trading-backend \
     --update-secrets=MY_SECRET=my-secret:latest
   ```

2. **Authentication**
   - Implement OAuth 2.0 or JWT authentication
   - Use Firebase Authentication for easy integration
   - Add API rate limiting

3. **CORS Configuration**
   - Restrict CORS to known domains
   - Use environment-specific configurations

### Performance

1. **Caching**
   - Implement Redis for session storage
   - Use CDN for static assets (Cloud CDN)

2. **Database**
   - Add Cloud SQL (PostgreSQL) for persistent data
   - Implement connection pooling
   - Use read replicas for scaling

3. **Monitoring**
   - Enable Cloud Logging
   - Set up Cloud Monitoring dashboards
   - Configure alerting policies

### Scaling

1. **Cloud Run Scaling**
   ```bash
   gcloud run services update trading-backend \
     --min-instances=1 \
     --max-instances=10 \
     --concurrency=80
   ```

2. **Load Balancing**
   - Use Cloud Load Balancing for traffic distribution
   - Configure health checks

### Backup and Recovery

1. **Database Backups**
   - Enable automated backups for Cloud SQL
   - Test restore procedures regularly

2. **Disaster Recovery**
   - Deploy to multiple regions
   - Use Cloud Storage for data backups

### Cost Optimization

1. **Cloud Run**
   - Use minimum instances judiciously
   - Optimize container startup time
   - Monitor and adjust resource limits

2. **Storage**
   - Use lifecycle policies for Cloud Storage
   - Archive old logs

3. **Monitoring**
   - Set up budget alerts
   - Review cost reports regularly

### CI/CD Pipeline

1. **GitHub Actions Integration**
   ```yaml
   # .github/workflows/deploy.yml
   name: Deploy to GCP
   on:
     push:
       branches: [main]
   jobs:
     deploy:
       runs-on: ubuntu-latest
       steps:
         - uses: actions/checkout@v2
         - uses: google-github-actions/setup-gcloud@v0
         - run: gcloud builds submit --config cloudbuild.yaml
   ```

2. **Testing in CI/CD**
   - Run unit tests before deployment
   - Implement integration tests
   - Use staging environment

### Maintenance

1. **Updates**
   - Keep dependencies updated
   - Monitor security advisories
   - Schedule maintenance windows

2. **Logging**
   - Implement structured logging
   - Set up log aggregation
   - Create dashboards for key metrics

3. **Health Checks**
   - Implement liveness probes
   - Configure readiness checks
   - Monitor endpoint availability

## Troubleshooting

### Common Issues

1. **CORS Errors**
   - Check backend CORS configuration
   - Verify frontend API URLs
   - Ensure proper headers are set

2. **Build Failures**
   - Check Cloud Build logs
   - Verify Dockerfile configurations
   - Ensure dependencies are properly locked

3. **Connection Issues**
   - Verify network connectivity
   - Check firewall rules
   - Ensure services are running

### Debug Commands

```bash
# View Cloud Run logs
gcloud run services logs read trading-backend --limit=50

# Check service status
gcloud run services describe trading-backend --region us-central1

# List builds
gcloud builds list --limit=10

# View build logs
gcloud builds log [BUILD_ID]
```

## Support and Resources

- [Google Cloud Documentation](https://cloud.google.com/docs)
- [Cloud Run Documentation](https://cloud.google.com/run/docs)
- [Cloud Build Documentation](https://cloud.google.com/build/docs)
- [Stack Overflow](https://stackoverflow.com/questions/tagged/google-cloud-platform)

## Next Steps

1. Set up continuous deployment
2. Implement comprehensive testing
3. Add monitoring and alerting
4. Configure custom domains
5. Implement authentication
6. Add database integration
7. Set up staging environment
8. Create runbooks for common tasks
