import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from '../services/product.service';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './products.html',
  styleUrls: ['./products.css']
})
export class Products implements OnInit {

  products: any[] = [];
  product_id: number = 28;
  constructor(
    private productService: ProductService,
    private cart: CartService
  ) {}

  ngOnInit() {
  this.productService.getProducts().subscribe(
    (data: any[]) => {
      this.products = data;
    },
    (err) => {
      console.error('Failed to load products', err);
    }
  );
}


  addToCart(id: number) {
    this.cart.add(id).subscribe({
      next: () => alert('Added to cart'),
      error: () => alert('Failed to add to cart')
    });
  }
}
