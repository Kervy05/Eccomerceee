import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class OrderService {
  api = 'http://localhost:3000/orders';

  constructor(private http: HttpClient) {}

  private headers() {
    return {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + localStorage.getItem('token')
      })
    };
  }

  checkout() {
    return this.http.post(`${this.api}/checkout`, {}, this.headers());
  }

  history() {
    return this.http.get<any[]>(this.api, this.headers());
  }
}
