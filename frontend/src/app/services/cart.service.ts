import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class CartService {
  private api = 'http://localhost:3000/cart';

  constructor(private http: HttpClient) {}

  add(product_id: number, quantity = 1) {
    return this.http.post(`${this.api}/add`, { product_id, quantity });
  }

  getCart() {
    return this.http.get<any[]>(this.api);
  }
}
