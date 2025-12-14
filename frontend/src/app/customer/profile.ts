import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  standalone: true,
  template: `
    <div class="profile">
      <h2>My Profile</h2>

      <p><strong>Name:</strong> {{ profile?.name }}</p>
      <p><strong>Email:</strong> {{ profile?.email }}</p>
      <p><strong>Contact:</strong> {{ profile?.contact_number }}</p>
      <p><strong>Role:</strong> {{ profile?.role }}</p>
    </div>
  `,
  styles: [`
    .profile {
      max-width: 400px;
      margin: auto;
      padding: 30px;
    }
  `]
})
export class CustomerProfile implements OnInit {

  profile: any;

  constructor(private auth: AuthService) {}

  ngOnInit() {
    this.auth.getProfile().subscribe(data => {
      this.profile = data;
    });
  }
}
