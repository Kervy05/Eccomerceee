import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ProductService {
  private API = 'http://localhost:3000/products';

  constructor(private http: HttpClient) {}

  private getHeaders() {
    const token = localStorage.getItem('token');
    return {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      })
    };
  }

  getProducts() {
    return this.http.get<any[]>(this.API);
  }

  addProduct(product: any) {
    return this.http.post(this.API, product, this.getHeaders());
  }

  deleteProduct(id: number) {
    return this.http.delete(`${this.API}/${id}`, this.getHeaders());
  }
}
