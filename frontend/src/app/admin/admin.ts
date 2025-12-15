import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../services/product.service';

@Component({
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin.html',
  styleUrls: ['./admin.css']
})
export class Admin implements OnInit {

  products: any[] = [];

  newProduct = {
    product_name: '',
    price: 0,
    description: ''
  };

  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.loadProducts();
  }

  loadProducts() {
    this.productService.getProducts().subscribe({
      next: (data: any[]) => this.products = data,
      error: (err: any) => console.error(err)
    });
  }

  addProduct() {
    this.productService.addProduct(this.newProduct).subscribe({
      next: () => {
        alert('Product added');
        this.newProduct = {
          product_name: '',
          price: 0,
          description: ''
        };
        this.loadProducts();
      },
      error: (err: any) => {
        console.error(err);
        alert('Failed to add product');
      }
    });
  }

  deleteProduct(id: number) {
    if (!confirm('Delete this product?')) return;

    this.productService.deleteProduct(id).subscribe({
      next: () => {
        alert('Product deleted');
        this.loadProducts();
      },
      error: (err: any) => console.error(err)
    });
  }
}
