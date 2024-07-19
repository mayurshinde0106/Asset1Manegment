import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, ObservedValuesFromArray, throwError } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private http: HttpClient) { }

  url = 'http://localhost:42001/'
  // Employee Get Data
  Getemployee(loginData: any): Observable<any> {

    let params = new HttpParams().set('Mail', loginData.Mail).set('Password', loginData.Password);
    return this.http.get<any>(this.url + 'api/GetEmployeeLogin', { params }).pipe(
      catchError(this.handleError)
    );
  }

  // Employee Post Data
  registeremployee(employee: any): Observable<any> {
    return this.http.post<any>(this.url + 'SetEmployeesDetails', employee).pipe(
      catchError(this.handleError)
    );
  }



  // Get Employee By Id
  GetAllEmployee(EmployeeId: number) {
    let params = new HttpParams().set('EmployeeId', EmployeeId);

    return this.http.get<any>(this.url + 'api/GetEmployeeDetail', { params }).pipe(
      catchError(this.handleError)
    );
  }

  //errror Handing

  private handleError(error: any): Observable<never> {
    console.error('An error is occured ', error);
    return throwError(error);
  }
}
