import { Component, OnInit, inject } from '@angular/core';
import { UserCardComponent } from '../../shared/components/user-card/user-card.component';
import { AuthService } from '../../core/service/auth.service';
import { CommonModule } from '@angular/common';
import { LoaderComponent } from '../../shared/components/loader/loader.component';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [UserCardComponent, CommonModule, LoaderComponent, RouterModule],
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit {
  username: string = 'Muhammed';
  totalPaidAmount: number = 0;
  paymentDetailsData: any[] = [];
  currentUser: any = JSON.parse(localStorage.getItem('userInfo')!);
  monthsList: Array<string> = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
  loading: boolean = false;
  userDetails: any;

  authService = inject(AuthService);
  router = inject(Router);

  ngOnInit(): void {
    this.getUserDetails();
    this.getPaymentDetails();
  }

  getUserDetails() {
    this.authService.getUserDetails(this.currentUser?.uid)
      .then((response: any) => {
        this.userDetails = response.data()
      })
  }

  getPaymentDetails() {
    this.loading = true;
    this.paymentDetailsData = [];
    this.authService.getPaymentDetails().subscribe((response) => {
      response.forEach(docs => {
        const docItem = docs.data();
        console.log(docItem['uid'], this.currentUser?.uid)
        if (docItem['uid'] === this.currentUser?.uid) {
              const dateValue = new Date(docItem['monthAndDay']['seconds']*1000);
              docItem['date'] = `${this.monthsList[dateValue.getMonth()]} - ${dateValue.getFullYear()}`

              this.totalPaidAmount += docItem['amount'];
              this.paymentDetailsData.push(docItem);
            }
      });
      this.loading = false; 
    })
  }

}
