import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AssetService } from '../../shared/service/asset.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SessionService } from '../../shared/service/Session/session.service';
import { EmployeeService } from '../../shared/service/Employee/employee.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  loginData = {
    Mail: '',
    Password: ''
  };
  private storageKey = 'Usersession';
  errorMessage: string = '';
  successMessage: string = '';

  constructor(private http: HttpClient, private assetservice: AssetService, private router: Router, private sessionservice: SessionService, private employeeService: EmployeeService) { }

  private readonly TOKEN_KEY = 'authToken';

  onSubmit(): void {
    this.errorMessage = ''; 
    this.employeeService.Getemployee(this.loginData)
      .subscribe(
        response => {
          if (response.exception == "Password does not match") {
            console.log('Login failed password is wrong');
          }

          else if (response.exception == "No Data Found") {
            console.log('Login failed mail is wrong');

          }
          else if (response.exception == null) {
            this.successMessage = ' Successfully login'
            console.log('Login Successfully ! ');
            localStorage.setItem('Usersession', JSON.stringify(response.data[0]));
            localStorage.setItem('session', JSON.stringify(true));
            
            alert('Successfully login ');
            this.router.navigate(["/assetCard"]);
          }
          console.log(' ', response);
          },
        error => {
          console.error('Login failed:', error);
          this.errorMessage = 'Invalid credentials. Please try again.'; // Display error message
        }
      );
  }

}
