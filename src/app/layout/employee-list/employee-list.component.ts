import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AssetService } from '../../shared/service/asset.service';
import { response } from 'express';
import { error } from 'console';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { EmployeeService } from '../../shared/service/Employee/employee.service';

@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './employee-list.component.html',
  styleUrl: './employee-list.component.css'
})
export class EmployeeListComponent {

  constructor(private router:Router,private routes:ActivatedRoute,private assetService:AssetService,private employeeService:EmployeeService){}

  

  Items = {
    Id:0,
    Name: '',
    Email: '',
    EmployeeDOB: '',
    EmployeeJoinD: '',
    Employeedepartment:  ''

  }

  EmployeeDetail:any;  EmployeeId:number=1;
  ngOnInit(){

    console.log('Hello Employee List : ')
    this.routes.queryParams.subscribe(params => {
      this.EmployeeId=params['EmployeeId'];
    })
   // debugger
    this.employeeService.GetAllEmployee(this.EmployeeId).subscribe(
      response=>{
        //   this.EmployeeDetail=response.data[0];

        this.Items.Id=response.data[0].Id;
        this.Items.Name=response.data[0].Name;
        this.Items.Email=response.data[0].Email;
        this.Items.EmployeeDOB= response.data[0].EmployeeDOB;
        this.Items.EmployeeJoinD = response.data[0].EmployeeJoinD;
        this.Items.Employeedepartment=response.data[0].Employeedepartment;

          console.log('Employee Data',this.Items);
          console.log( response.data[0].EmployeeJoinD.type);
          
      },
      error=>{
        console.log('error');
      }
    )

  }
}
