import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login-page.html',
  styleUrl: './login-page.css',
})
export class LoginPage implements OnInit {

  loginForm!: FormGroup;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private http: HttpClient,
    private auth: AuthService
  ) {}

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: [''],
      password: ['']
    });
  }

  goToSignup() {
    this.router.navigate(['/signup']);
  }

  login() {
    if (this.loginForm.invalid) {
      alert('Please enter email and password');
      return;
    }

    this.http.post<any>('http://localhost:3000/auth/login', this.loginForm.value)
      .subscribe({
        next: (res) => {
          // ✅ Use AuthService (single source of truth)
          this.auth.login(res.token, res.role, res.name);

          // ✅ Redirect by role
          if (res.role === 'Admin') {
            this.router.navigate(['/admin']);
          } else if (res.role === 'Staff') {
            this.router.navigate(['/staff']);
          } else {
            this.router.navigate(['/customer']);
          }
        },
        error: () => {
          alert('Invalid email or password');
        }
      });
  }
}
