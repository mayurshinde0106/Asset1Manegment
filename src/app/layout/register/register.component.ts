import { Component } from '@angular/core';
import { AssetService } from '../../shared/service/asset.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { EmployeeService } from '../../shared/service/Employee/employee.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  private apiUrl = "http://localhost:42001/SetEmployeesDetails";
  Employeedepartment: any;

  constructor(private assetservice: AssetService, private router: Router, private employeeService: EmployeeService) { }

  employee = {
    name: '',
    email: '',
    password: '',
    Employeedepartment: '',
    EmployeeDOB: Date

  }
  EmployeedepartmentList: string[] = ['IT', 'Sales', 'Human Resources', 'Finance'];

  successMessage: string = '';
  errorMessage: string = '';
  // EmployeeService: any;



  register(): void {

    // this.employeeService.logout();

    this.employeeService.registeremployee(this.employee).subscribe(response => {
      this.successMessage = 'Employee registered successfully!';
      console.log(this.successMessage);
      alert('Successfully Register ');
      setTimeout(() => {
        this.router.navigate(["/assetCard"])
      }, 5000)


    },
      () => {
        this.errorMessage = 'Failed to register employe';
        console.log(this.errorMessage);
      });

  }


}
