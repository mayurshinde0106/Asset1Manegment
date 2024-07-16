import { Component } from '@angular/core';
import { AssetService } from '../../shared/service/asset.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  private apiUrl = "http://localhost:42001/SetEmployeesDetails";

  constructor(private assetservice: AssetService, private router: Router) {}

  employee = {
    name: '',
    email: '',
    password: ''
  }

  successMessage: string = '';
  errorMessage: string = '';
  // EmployeeService: any;

  
  
    register():void{
      
     // this.employeeService.logout();

      this.assetservice.registeremployee(this.employee).subscribe( response =>{
        this.successMessage = 'Employee registered successfully!';
        console.log(this.successMessage);

        setTimeout(()=>{
          this.router.navigate(["/login"])
        },5000)
       

      },
      () => {
        this.errorMessage='Failed to register employe';
        console.log(this.errorMessage);
      });

        }


  }
