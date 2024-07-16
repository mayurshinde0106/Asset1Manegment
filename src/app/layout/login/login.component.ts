import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AssetService } from '../../shared/service/asset.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SessionService } from '../../shared/service/Session/session.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule,CommonModule,RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  
  loginData = {
    Mail: '',
    Password: ''
  };
  private storageKey ='Usersession';
    errorMessage: string = '';
    successMessage : string='';

  constructor(private http: HttpClient, private assetservice: AssetService , private router: Router,private sessionservice:SessionService) { }

  private readonly TOKEN_KEY = 'authToken';

  onSubmit(): void {
    this.errorMessage = ''; // Clear previous error message
    // Make POST request to backend api
    //this.employeeService.login();

    this.assetservice.Getemployee(this.loginData)
      .subscribe(
        response => {
          if (response.exception == "Password does not match") {
            console.log('Login failed password is wrong');
          }

             else if (response.exception == "No Data Found") {
            console.log('Login failed mail is wrong');

          }
          else if (response.exception == null) {
            this.successMessage=' Successfully login'
            console.log('Login Successfully ! ');
           
            localStorage.setItem(this.storageKey,JSON.stringify(response.data[0]));
            localStorage.setItem('session',JSON.stringify(true));
            alert('Successfully login ');
            // localStorage.setItem(this.TOKEN_KEY, response.data[0].Name);
            // this.sessionservice.setSession(response.data[0]);
          //  this.router.navigateByUrl("/home");
          }
          console.log(' ', response);
          // Add logic to handle successful login (e.g., redirect to dashboard)
        },
        error => {
          console.error('Login failed:', error);
          this.errorMessage = 'Invalid credentials. Please try again.'; // Display error message
        }
      );
  }

  // onSubmit(){
  //   this.errorMessage = ''; // Clear previous error message

  //   // Make POST request to backend API
  //   this.http.get<any>(`http://localhost:42001/api/GetEmployeeLogin?Email=${this.loginData.email}&Password=${this.loginData.password}`,)
  //     .subscribe(
  //       response => {
  //         if (response.exception == "Password does not match") {
  //           console.log('Login failed password is wrong');
  //         }
  //         else if (response.exception == "No Data Found") {
  //           console.log('Login failed mail is wrong');

  //         }
  //         else if (response.exception ==null) {
  //           console.log('Login Successfully ! ');
  //           this.router.navigateByUrl("/home");
  //         }
  //         console.log(' ', response);
  //         // Add logic to handle successful login (e.g., redirect to dashboard)
  //       },
  //       error => {
  //         console.error('Login failed:', error);
  //         this.errorMessage = 'Invalid credentials. Please try again.'; // Display error message
  //       }
  //     );
  // }



}
