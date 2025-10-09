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

export interface Position {
  symbol: string;
  quantity: number;
  avgPrice: number;
  currentPrice?: number;
  marketValue?: number;
  profitLoss?: number;
}

export interface Portfolio {
  cash: number;
  positions: Position[];
  totalValue: number;
}

export const api = {
  getStocks: () => axios.get<{ [key: string]: Stock }>(`${API_BASE_URL}/stocks`),
  getStock: (symbol: string) => axios.get<Stock>(`${API_BASE_URL}/stocks/${symbol}`),
  placeOrder: (order: Order) => axios.post<Order>(`${API_BASE_URL}/orders`, order),
  getOrders: () => axios.get<Order[]>(`${API_BASE_URL}/orders`),
  getPortfolio: () => axios.get<Portfolio>(`${API_BASE_URL}/portfolio`),
};
