import { Routes } from '@angular/router';
import { LoginPage } from './login-page/login-page';
import { SignupPage } from './signup-page/signup-page';
import { LandingPage } from './landing-page/landing-page';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [

  // ✅ LANDING PAGE
  { path: '', component: LandingPage },

  // Auth
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

  // 🔐 CUSTOMER (LAYOUT + CHILDREN)
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
    },
    {
      path: 'orders', // ✅ ORDER HISTORY
      loadComponent: () =>
        import('./customer/order-history').then(m => m.OrderHistory)
    },
    {
      path: 'cart', // ✅ CART PAGE
      loadComponent: () =>
        import('./customer/cart').then(m => m.Cart)
    }
  ]
},


  // fallback
  { path: '**', redirectTo: '' }
];
