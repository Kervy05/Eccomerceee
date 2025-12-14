import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ProductService {

  private API = 'http://localhost:3000/products';

  constructor(private http: HttpClient) {}

  getProducts(): Observable<any[]> {
    const token = localStorage.getItem('token'); // 🔑 JWT

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    return this.http.get<any[]>(this.API, { headers });
  }
}
