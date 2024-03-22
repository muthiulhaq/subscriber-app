import { Component, OnInit, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './core/components/header/header.component';
import { AuthService } from './core/service/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent],
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  
  firebaseAuth = inject(AuthService);
  
  ngOnInit(): void {

  }

  title = 'medicine';
}
