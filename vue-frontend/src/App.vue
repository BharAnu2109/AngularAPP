<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { api, type Portfolio, type Position } from './services/api';

const portfolio = ref<Portfolio | null>(null);
const loading = ref(true);

const loadPortfolio = async () => {
  try {
    const response = await api.getPortfolio();
    portfolio.value = response.data;
    loading.value = false;
  } catch (error) {
    console.error('Error loading portfolio:', error);
    loading.value = false;
  }
};

onMounted(() => {
  loadPortfolio();
  // Refresh portfolio every 5 seconds
  setInterval(loadPortfolio, 5000);
});
</script>

<template>
  <div class="portfolio-app">
    <header>
      <h1>Vue Portfolio Manager</h1>
      <p>Track your trading investments</p>
    </header>

    <div v-if="loading" class="loading">
      Loading portfolio...
    </div>

    <div v-else-if="portfolio" class="content">
      <section class="summary">
        <h2>Portfolio Summary</h2>
        <div class="summary-cards">
          <div class="card">
            <h3>Cash Balance</h3>
            <p class="amount">${{ portfolio.cash.toFixed(2) }}</p>
          </div>
          <div class="card">
            <h3>Total Value</h3>
            <p class="amount">${{ portfolio.totalValue.toFixed(2) }}</p>
          </div>
          <div class="card">
            <h3>Invested</h3>
            <p class="amount">${{ (portfolio.totalValue - portfolio.cash).toFixed(2) }}</p>
          </div>
          <div class="card">
            <h3>Positions</h3>
            <p class="amount">{{ portfolio.positions.length }}</p>
          </div>
        </div>
      </section>

      <section class="positions">
        <h2>Current Positions</h2>
        <div v-if="portfolio.positions.length === 0" class="no-positions">
          No positions yet. Start trading to build your portfolio!
        </div>
        <div v-else class="positions-table">
          <div class="table-header">
            <div>Symbol</div>
            <div>Quantity</div>
            <div>Avg Price</div>
            <div>Current Price</div>
            <div>Market Value</div>
            <div>P&L</div>
          </div>
          <div v-for="position in portfolio.positions" :key="position.symbol" class="table-row">
            <div class="symbol">{{ position.symbol }}</div>
            <div>{{ position.quantity }}</div>
            <div>${{ position.avgPrice?.toFixed(2) }}</div>
            <div>${{ position.currentPrice?.toFixed(2) }}</div>
            <div>${{ position.marketValue?.toFixed(2) }}</div>
            <div :class="['pnl', position.profitLoss && position.profitLoss >= 0 ? 'positive' : 'negative']">
              ${{ position.profitLoss?.toFixed(2) }}
            </div>
          </div>
        </div>
      </section>
    </div>

    <div v-else class="error">
      Failed to load portfolio. Please check if the backend server is running.
    </div>
  </div>
</template>

<style scoped>
.portfolio-app {
  min-height: 100vh;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
}

header {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 40px;
  text-align: center;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
}

header h1 {
  margin: 0;
  font-size: 2.5em;
}

header p {
  margin: 10px 0 0 0;
  font-size: 1.2em;
  opacity: 0.9;
}

.content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 30px 20px;
}

.loading, .error {
  text-align: center;
  padding: 40px;
  font-size: 1.2em;
}

.summary {
  background: white;
  padding: 20px;
  border-radius: 10px;
  margin-bottom: 30px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
}

.summary h2 {
  margin-top: 0;
  color: #333;
  border-bottom: 2px solid #667eea;
  padding-bottom: 10px;
}

.summary-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin-top: 20px;
}

.card {
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  padding: 20px;
  border-radius: 8px;
  text-align: center;
}

.card h3 {
  margin: 0 0 10px 0;
  color: #666;
  font-size: 0.9em;
  text-transform: uppercase;
}

.amount {
  font-size: 2em;
  font-weight: bold;
  color: #667eea;
  margin: 0;
}

.positions {
  background: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
}

.positions h2 {
  margin-top: 0;
  color: #333;
  border-bottom: 2px solid #667eea;
  padding-bottom: 10px;
}

.no-positions {
  text-align: center;
  padding: 40px;
  color: #666;
}

.positions-table {
  margin-top: 20px;
}

.table-header, .table-row {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 10px;
  padding: 15px;
  text-align: center;
}

.table-header {
  background: #f8f9fa;
  font-weight: bold;
  border-radius: 5px;
  margin-bottom: 10px;
}

.table-row {
  background: #f8f9fa;
  border-radius: 5px;
  margin-bottom: 10px;
  align-items: center;
}

.symbol {
  font-weight: bold;
  color: #667eea;
}

.pnl.positive {
  color: #28a745;
  font-weight: bold;
}

.pnl.negative {
  color: #dc3545;
  font-weight: bold;
}
</style>
