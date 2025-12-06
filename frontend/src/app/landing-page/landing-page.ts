import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landing-page',
  imports: [],
  templateUrl: './landing-page.html',
  styleUrl: './landing-page.css',
})
export class LandingPage {
constructor(private router: Router) {}

  goToLogin() {
    this.router.navigate(['/login']);
  }

  goToSignup() {
    this.router.navigate(['/signup']);
  }
}
