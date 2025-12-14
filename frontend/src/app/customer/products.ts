import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from '../services/product.service';
import { CartService } from '../services/cart.service';

@Component({
  standalone: true,
  imports: [CommonModule],
  templateUrl: './products.html',
  styleUrl: './products.css'
})
export class Products implements OnInit {

  products: any[] = [];

  // ✅ ADD CartService HERE
  constructor(
    private productService: ProductService,
    private cart: CartService
  ) {}

  ngOnInit() {
    this.productService.getProducts().subscribe(data => {
      this.products = data;
    });
  }

  // ✅ ADD THIS METHOD
  addToCart(productId: number) {
    this.cart.add(productId).subscribe(() => {
      alert('Added to cart');
    });
  }
}
