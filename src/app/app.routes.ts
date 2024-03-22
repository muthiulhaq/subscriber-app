import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HomeComponent } from './components/home/home.component';
import { AdminComponent } from './components/admin/admin.component';
import { adminGuard, subscriberGuard } from './core/service/auth-guard.service';

export const routes: Routes = [
    {
        path: '',
        component: HomeComponent
    },
    {
        path: 'login',
        component: LoginComponent,
    },
    {
        path: 'register',
        component: RegisterComponent,
    },
    {
        path: 'dashboard',
        component: DashboardComponent,
        canActivate: [subscriberGuard]
    },
    {
        path: 'admin',
        component: AdminComponent,
        canActivate: [subscriberGuard, adminGuard]
    },
    { 
        path: '**', 
        redirectTo: '' 
    }
];
