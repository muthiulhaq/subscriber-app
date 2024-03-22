import { Component, Inject, inject } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { AuthService } from '../../core/service/auth.service';
import { Router, RouterModule } from '@angular/router';
import { LoaderComponent } from '../../shared/components/loader/loader.component';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    InputTextModule, 
    FormsModule, 
    ButtonModule, 
    RouterModule,
    LoaderComponent
  ],
  templateUrl: './register.component.html'
})
export class RegisterComponent {

  authService = inject(AuthService);
  router = inject(Router);

  username: string = '';
  emailId: string = '';
  password: string = '';
  errorMessage: string | null = null;
  loading: boolean = false;

  register() {
    this.loading = true;
    this.authService.register(this.emailId, this.username, this.password)
      .subscribe({
        next: (data) => {
          this.loading = false;
          this.router.navigateByUrl('/dashboard');
        },
        error: (error) => {
        debugger

          this.loading = false;
          this.errorMessage = error.code.split('/')[1];
        }
    })
  }
}
