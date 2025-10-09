import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

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

export interface Portfolio {
  cash: number;
  positions: any[];
  totalValue: number;
}

@Injectable({
  providedIn: 'root'
})
export class TradingService {
  private apiUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) { }

  getStocks(): Observable<any> {
    return this.http.get(`${this.apiUrl}/stocks`);
  }

  getStock(symbol: string): Observable<Stock> {
    return this.http.get<Stock>(`${this.apiUrl}/stocks/${symbol}`);
  }

  placeOrder(order: Order): Observable<Order> {
    return this.http.post<Order>(`${this.apiUrl}/orders`, order);
  }

  getOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(`${this.apiUrl}/orders`);
  }

  getPortfolio(): Observable<Portfolio> {
    return this.http.get<Portfolio>(`${this.apiUrl}/portfolio`);
  }
}
