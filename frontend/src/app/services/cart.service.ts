import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class CartService {
  api = 'http://localhost:3000/cart';

  constructor(private http: HttpClient) {}

  private headers() {
    return {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + localStorage.getItem('token')
      })
    };
  }

  add(product_id: number) {
    return this.http.post(`${this.api}/add`, { product_id }, this.headers());
  }

  get() {
    return this.http.get<any[]>(this.api, this.headers());
  }

  remove(id: number) {
    return this.http.delete(`${this.api}/${id}`, this.headers());
  }
  updateQuantity(cartItemId: number, quantity: number) {
  return this.http.put(
    `http://localhost:3000/cart/${cartItemId}`,
    { quantity }
  );
}

}

