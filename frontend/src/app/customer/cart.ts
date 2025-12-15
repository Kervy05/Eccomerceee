import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from '../services/cart.service';
import { OrderService } from '../services/order.service';

@Component({
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart.html',
  styleUrls: ['./cart.css']
})
export class Cart implements OnInit {

  items: any[] = [];
  total = 0;

  constructor(
    private cartService: CartService,
    private orderService: OrderService
  ) {}

  ngOnInit() {
    this.load();
  }

  load() {
    this.cartService.get().subscribe(data => {
      // ensure quantity exists
      this.items = data.map(item => ({
        ...item,
        quantity: item.quantity ?? 1
      }));

      this.calculateTotal();
      console.log('Cart items:', this.items);
    });
  }

  calculateTotal() {
    this.total = this.items.reduce(
      (sum, item) => sum + (Number(item.price) * item.quantity),
      0
    );
  }

  update(item: any, change: number) {
    const newQty = item.quantity + change;

    if (newQty < 1) return;

    item.quantity = newQty;
    this.calculateTotal();
  }

  remove(cartItemId: number) {
    this.cartService.remove(cartItemId).subscribe(() => {
      this.load();
    });
  }

  checkout() {
    this.orderService.checkout().subscribe(() => {
      alert('Order placed');
      this.load();
    });
  }
}
