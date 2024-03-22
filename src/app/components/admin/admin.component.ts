import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputNumberModule } from 'primeng/inputnumber';
import { ButtonModule } from 'primeng/button';
import { UserCardComponent } from '../../shared/components/user-card/user-card.component';
import { InputTextModule } from 'primeng/inputtext';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { AuthService } from '../../core/service/auth.service';
import { CommonModule } from '@angular/common';
import { LoaderComponent } from '../../shared/components/loader/loader.component';
import { ToastModule } from 'primeng/toast'; 
import { MessageService } from 'primeng/api';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [
    InputNumberModule, 
    FormsModule, 
    ButtonModule, 
    UserCardComponent, 
    InputTextModule, 
    CalendarModule,
    DropdownModule,
    CommonModule,
    LoaderComponent,
    ToastModule,
    RouterModule
  ],
  providers: [MessageService],
  templateUrl: './admin.component.html'
})
export class AdminComponent implements OnInit {

  selectedPerson: any = null;
  amount: number = 0;
  yearAndMonth: Date = new Date();
  authService = inject(AuthService);
  people: any = [];
  errorMessage: string | null = null;
  loading: boolean = false;
  currentUser: any = JSON.parse(localStorage.getItem('userInfo')!);

  totalPaidAmount: number = 0;
  paymentDetailsData: any[] = [];
  monthsList: Array<string> = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
  

  messageService = inject(MessageService)

  ngOnInit(): void {
    this.getAllUsersList();
    this.getPaymentDetails();
  }

  getAllUsersList() {
    this.loading = true;
    this.authService.getAllUsers().then((response) => {
      this.people = response;
      this.loading = false;
    })
  }

  addPayment() {
    this.loading = true;
    debugger
    this.authService.addPayment(this.selectedPerson?.uid, this.currentUser?.uid, this.amount, this.yearAndMonth)
    .subscribe({
      next: (response) => {
        this.getPaymentDetails();
        this.loading = false;
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Payment added successfuly' });
      },
      error: (error) => {
        this.loading = false;
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Not updated, please try again later' });
      }
    })  
  }


  getPaymentDetails() {
    this.totalPaidAmount = 0;
    this.loading = true;
    this.paymentDetailsData = [];
    this.authService.getPaymentDetails().subscribe((response) => {
      response.forEach(docs => {
        const docItem = docs.data();
        console.log(docItem['uid'], this.selectedPerson?.uid)
        if (docItem['uid'] === this.selectedPerson?.uid) {
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
