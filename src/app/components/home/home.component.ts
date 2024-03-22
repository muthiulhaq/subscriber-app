import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {

  isLogin: boolean = false;

  ngOnInit(): void {
    this.isLogin = localStorage.getItem('userInfo') ? true : false;
  }

}
