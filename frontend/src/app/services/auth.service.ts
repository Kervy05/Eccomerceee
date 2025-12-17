import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class AuthService {

  constructor(private http: HttpClient) {}

  login(token: string, role: string, name: string) {
    localStorage.setItem('token', token);
    localStorage.setItem('role', role);
    localStorage.setItem('name', name);
  }

  logout() {
    localStorage.clear();
  }

  getToken() {
    return localStorage.getItem('token');
  }

  getRole() {
    return localStorage.getItem('role');
  }

  getName(): string {
    return localStorage.getItem('name') || '';
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  // CUSTOMER PROFILE
  getProfile() {
    return this.http.get<any>('http://localhost:3000/auth/profile', {
      headers: {
        Authorization: 'Bearer ' + this.getToken()
      }
    });
  }
}
