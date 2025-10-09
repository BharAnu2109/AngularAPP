const request = require('supertest');
const app = require('./server');

describe('Trading API Tests', () => {
  describe('Health Check', () => {
    it('should return healthy status', async () => {
      const res = await request(app).get('/health');
      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty('status', 'healthy');
      expect(res.body).toHaveProperty('timestamp');
    });
  });

  describe('Stocks API', () => {
    it('should get all stocks', async () => {
      const res = await request(app).get('/api/stocks');
      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty('AAPL');
      expect(res.body).toHaveProperty('GOOGL');
      expect(res.body).toHaveProperty('MSFT');
    });

    it('should get specific stock', async () => {
      const res = await request(app).get('/api/stocks/AAPL');
      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty('symbol', 'AAPL');
      expect(res.body).toHaveProperty('price');
      expect(res.body).toHaveProperty('name');
    });

    it('should return 404 for invalid stock', async () => {
      const res = await request(app).get('/api/stocks/INVALID');
      expect(res.statusCode).toBe(404);
    });
  });

  describe('Orders API', () => {
    it('should place a buy order', async () => {
      const orderData = {
        symbol: 'AAPL',
        quantity: 10,
        orderType: 'market',
        side: 'buy'
      };
      const res = await request(app)
        .post('/api/orders')
        .send(orderData);
      
      expect(res.statusCode).toBe(201);
      expect(res.body).toHaveProperty('id');
      expect(res.body).toHaveProperty('status', 'filled');
      expect(res.body.symbol).toBe('AAPL');
      expect(res.body.quantity).toBe(10);
    });

    it('should get all orders', async () => {
      const res = await request(app).get('/api/orders');
      expect(res.statusCode).toBe(200);
      expect(Array.isArray(res.body)).toBe(true);
    });

    it('should fail with missing fields', async () => {
      const orderData = {
        symbol: 'AAPL',
        quantity: 10
      };
      const res = await request(app)
        .post('/api/orders')
        .send(orderData);
      
      expect(res.statusCode).toBe(400);
    });
  });

  describe('Portfolio API', () => {
    it('should get portfolio', async () => {
      const res = await request(app).get('/api/portfolio');
      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty('cash');
      expect(res.body).toHaveProperty('positions');
      expect(res.body).toHaveProperty('totalValue');
    });
  });
});
