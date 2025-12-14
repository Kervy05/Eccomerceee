import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (route) => {
  const auth = inject(AuthService);
  const router = inject(Router);

  if (!auth.isLoggedIn()) {
    router.navigate(['/login']);
    return false;
  }

  const allowedRoles = route.data?.['roles'];
  const userRole = auth.getRole();

  if (allowedRoles && !allowedRoles.includes(userRole)) {
    router.navigate(['/login']);
    return false;
  }

  return true;
};
