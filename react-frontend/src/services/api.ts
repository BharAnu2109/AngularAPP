import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000/api';

export interface Stock {
  symbol: string;
  name: string;
  price: number;
}

export interface Order {
  id?: string;
  symbol: string;
  quantity: number;
  orderType: string;
  side: string;
  price?: number;
  total?: number;
  status?: string;
  timestamp?: string;
}

export const api = {
  getStocks: () => axios.get(`${API_BASE_URL}/stocks`),
  getStock: (symbol: string) => axios.get(`${API_BASE_URL}/stocks/${symbol}`),
  placeOrder: (order: Order) => axios.post(`${API_BASE_URL}/orders`, order),
  getOrders: () => axios.get(`${API_BASE_URL}/orders`),
  getPortfolio: () => axios.get(`${API_BASE_URL}/portfolio`),
};
