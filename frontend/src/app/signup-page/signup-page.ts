import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-signup-page',
  standalone: true,
  imports: [ReactiveFormsModule, HttpClientModule], //  ADD THIS
  templateUrl: './signup-page.html',
  styleUrl: './signup-page.css',
})
export class SignupPage {

  signupForm!: FormGroup; // ADD TYPE

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {
    this.signupForm = this.fb.group({
      name: [''],
      email: [''],
      contact_number: [''], // ✅ correct
      password: [''],
      confirmPassword: ['']
    });
  }

  signUp() {
    const {
      name,
      email,
      contact_number,
      password,
      confirmPassword
    } = this.signupForm.value;

    if (!name || !email || !password) {
      alert('Please fill in all required fields');
      return;
    }

    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    this.http.post('http://localhost:3000/auth/register', {
      name: name.trim(),
      email: email.trim(),
      contact_number: contact_number?.trim() || null,
      password
    }).subscribe({
      next: () => {
        alert('Account created successfully! Please login.');
        this.router.navigate(['/login']);
      },
      error: (err) => {
        alert(err.error?.message || 'Registration failed');
      }
    });
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }
}
