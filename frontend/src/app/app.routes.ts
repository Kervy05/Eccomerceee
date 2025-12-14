import { Routes } from '@angular/router';
import { LoginPage } from './login-page/login-page';
import { SignupPage } from './signup-page/signup-page';
import { LandingPage } from './landing-page/landing-page';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [

  // ✅ LANDING PAGE (DEFAULT)
  { path: '', component: LandingPage },

  // Auth pages
  { path: 'login', component: LoginPage },
  { path: 'signup', component: SignupPage },

  // 🔐 ADMIN
  {
    path: 'admin',
    canActivate: [authGuard],
    data: { roles: ['Admin'] },
    loadComponent: () =>
      import('./admin/admin').then(m => m.Admin)
  },

  // 🔐 STAFF
  {
    path: 'staff',
    canActivate: [authGuard],
    data: { roles: ['Staff'] },
    loadComponent: () =>
      import('./staff/staff').then(m => m.Staff)
  },

  // 🔐 CUSTOMER (layout + children)
  {
    path: 'customer',
    canActivate: [authGuard],
    data: { roles: ['Customer'] },
    loadComponent: () =>
      import('./customer/customer').then(m => m.Customer),
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./customer/products').then(m => m.Products)
      },
      {
        path: 'products',
        loadComponent: () =>
          import('./customer/products').then(m => m.Products)
      },
      {
        path: 'profile',
        loadComponent: () =>
          import('./customer/profile').then(m => m.CustomerProfile)
      }
    ]
  },

  // ❌ fallback (optional but recommended)
  { path: '**', redirectTo: '' }
];
