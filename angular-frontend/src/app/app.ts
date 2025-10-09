import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { TradingService, Order, Portfolio } from './services/trading.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule, FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  stocks: any = {};
  orders: Order[] = [];
  portfolio: Portfolio | null = null;
  selectedStock: string | null = null;
  orderForm = {
    side: 'buy',
    quantity: 1,
    orderType: 'market'
  };

  constructor(private tradingService: TradingService) {}

  ngOnInit() {
    this.loadStocks();
    this.loadOrders();
    this.loadPortfolio();
  }

  loadStocks() {
    this.tradingService.getStocks().subscribe(data => {
      this.stocks = data;
    });
  }

  loadOrders() {
    this.tradingService.getOrders().subscribe(data => {
      this.orders = data;
    });
  }

  loadPortfolio() {
    this.tradingService.getPortfolio().subscribe(data => {
      this.portfolio = data;
    });
  }

  openTradeForm(symbol: string) {
    this.selectedStock = symbol;
  }

  cancelTrade() {
    this.selectedStock = null;
    this.orderForm = {
      side: 'buy',
      quantity: 1,
      orderType: 'market'
    };
  }

  placeOrder() {
    if (!this.selectedStock) return;

    const order: Order = {
      symbol: this.selectedStock,
      quantity: this.orderForm.quantity,
      side: this.orderForm.side,
      orderType: this.orderForm.orderType
    };

    this.tradingService.placeOrder(order).subscribe({
      next: (data) => {
        this.loadOrders();
        this.loadPortfolio();
        this.cancelTrade();
        alert('Order placed successfully!');
      },
      error: (error) => {
        alert('Error placing order: ' + error.message);
      }
    });
  }
}
