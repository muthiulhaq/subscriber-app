import { Component, inject } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { AuthService } from '../../core/service/auth.service';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { LoaderComponent } from '../../shared/components/loader/loader.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    InputTextModule, 
    FormsModule, 
    ButtonModule, 
    RouterModule,
    LoaderComponent
  ],
  templateUrl: './login.component.html'
})
export class LoginComponent {

  authService = inject(AuthService);
  router = inject(Router);

  emailId: string = '';
  password: string = '';
  errorMessage: string | null = null;
  loading: boolean = false;

  login() {
    this.loading = true;
    this.authService.login(this.emailId, this.password)
    .subscribe({
      next: (data) => {
      this.loading = false;
      this.router.navigateByUrl('/dashboard')
      },
      error: (error) => {
        this.loading = false;
        this.errorMessage = error.code.split('/')[1];
      }
    })
  }
}
