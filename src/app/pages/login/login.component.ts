import { HttpClient } from '@angular/common/http';
import { Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { error } from 'console';

@Component({
  selector: 'app-login',
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  http = inject(HttpClient);
  router = inject(Router);

  customerObj: any = {
    "userId": 0,
    "userName": "",
    "emailId": "",
    "fullName": "",
    "password": ""
  };
  //  prashant123
  // prashant@mail.com
  // prashant123
  // prashant123

  loginForm: FormGroup = new FormGroup({
    userName: new FormControl(""),
    password: new FormControl("")
  })

  showRegisterForm = signal<boolean>(false);
  // https://projectapi.gerasim.in/api/BankLoan/RegisterCustomer


  changeView() {
    this.showRegisterForm.set(!this.showRegisterForm());
  }

  onRegister() {
    // debugger;
    this.http.post('https://projectapi.gerasim.in/api/BankLoan/RegisterCustomer', this.customerObj).subscribe((res: any) => {
      if (res.result) {
        alert("customer registered");
      } else {
        alert(res.message);
      }
    }, error => {
      alert("Network error");
    })
  }

  onLogin() {
    const formValue = this.loginForm.value;
    this.http.post('https://projectapi.gerasim.in/api/BankLoan/login', formValue).subscribe((res: any) => {
      debugger;
      if (res.result) {
        alert("User Logged SuccessFully");
        sessionStorage.setItem("bankUser", JSON.stringify(res.data));
        this.router.navigateByUrl('application-list');
      } else {
        alert(res.message);
      }
    }, error => {
      alert("Network error");
    })

  }

}
