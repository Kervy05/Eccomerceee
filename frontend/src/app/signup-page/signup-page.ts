import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup-page',
  imports: [],
  templateUrl: './signup-page.html',
  styleUrl: './signup-page.css',
})
export class SignupPage {
constructor(private router: Router) {}

  goToLogin() {
    this.router.navigate(['/login']);
  }

  signUp() {
    // Add your signup logic here
    console.log("Sign Up clicked");
}
}
