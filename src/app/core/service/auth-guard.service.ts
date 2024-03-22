import { inject } from '@angular/core';
import { AuthService } from '../../core/service/auth.service';

export const subscriberGuard = () => {

  if (localStorage.getItem('userInfo')) {
      return true;
  } else {
      return false;
  }

}

export const adminGuard = () => {
  
  const authService: AuthService = inject(AuthService);
  const currentUser: any = JSON.parse(localStorage.getItem('userInfo')!);

  return authService.getUserDetails(currentUser?.uid)
      .then((response: any) => {
        const userDetails = response.data();

        if (userDetails?.role === 'admin') {
          return true;
        } else {
          return false;
        }
      })
}
