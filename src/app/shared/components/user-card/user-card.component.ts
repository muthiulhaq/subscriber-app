import { Component, OnInit, inject } from '@angular/core';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService, MessageService } from 'primeng/api';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../core/service/auth.service';

@Component({
  selector: 'app-user-card',
  standalone: true,
  imports: [ConfirmDialogModule, CommonModule],
  templateUrl: './user-card.component.html',
  providers: [ConfirmationService, MessageService]
})
export class UserCardComponent implements OnInit {

  constructor(private confirmationService: ConfirmationService, private messageService: MessageService) {}

  authService = inject(AuthService);

  currentUser: any ;
  userDetails: any;

  ngOnInit(): void {
    const localStorageUserData: string = localStorage.getItem('userInfo')!;
    this.currentUser = JSON.parse(localStorageUserData)
    this.getUserDetails();
  }

  getUserDetails() {
    this.authService.getUserDetails(this.currentUser?.uid)
      .then((response: any) => {
        this.userDetails = response.data()
      })
  }

  logout(event: Event) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Are you sure that you want to signout?',
      header: 'Signout?',
      icon: 'pi pi-exclamation-triangle',
      acceptIcon:"none",
      rejectIcon:"none",
      rejectButtonStyleClass:"p-button-text",
      accept: () => {
          this.authService.logOut();
      },
      reject: () => {
          console.log('Not Sign out')
      }
    });
  }
}
