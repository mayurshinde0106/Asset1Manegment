import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterModule, RouterOutlet } from '@angular/router';
import { SessionService } from '../../shared/service/Session/session.service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterOutlet, RouterLinkActive,CommonModule,RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  constructor(private router: Router, private sessionservice: SessionService) {

  }

  public sessionData:any;

  rightFieldName:string='login';

  EmplyId:number=1;
  ngOnInit(){
     debugger

  this.viewAsset();
    

    if(this.sessionData=='true')
    {
          this.rightFieldName=this.employee.employeeName;
          this.EmplyId=this.employee.Id;
    }
    if(this.sessionData=='false')
    {
      this.rightFieldName="login";
    }

    
  }

  // viewAsset() {
  //   console.log("hello");

  //   // this.router.navigate(['/assetlist']);
  //   debugger
  //   this.sessionData = localStorage.getItem('session');
  //        console.log(this.sessionData,'sessionData---->')

  // }

  userDetails:any;

 // UserName:string='';
 employee = {
  employeeName:'',
  Id:1
}
  viewAsset() {
    console.log("hello");
  //  debugger
    // Check if localStorage is available
    if (typeof localStorage !== 'undefined') {

        this.sessionData = localStorage.getItem('session');

        this.userDetails= this.sessionservice.getSession();
        this.employee.employeeName=this.userDetails.Name;
        this.employee.Id=this.userDetails.Id;

        console.log(this.sessionData,'sessionData---->')
        console.log( this.employee.employeeName,'employee Name')
    } else {
        
        console.warn('localStorage is not available.');
    }
    // this.router.navigate(['/assetlist/:Action']);
}




  //sessionData=true;
  assetList(Actions: string) {

    // this.router.navigate(['specificAssetItem'],{queryParams: {Action:Actions}});
    if (this.sessionData=='true') {
      this.router.navigate(['assetlist/:Action'], { queryParams: { Action: Actions } });
    }
    else {
      alert('Please Login ');
      this.router.navigate(['login']);
    }
  }

  addAsset() {

    if (this.sessionData=='true') {
      this.router.navigate(['addAsset']);

    }
    else {
      alert('Please Login ');
      this.router.navigate(['login']);
    }
  }

  assetCard() {
    if (this.sessionData=='true') {
      this.router.navigate(['assetCard']);

    }
    else {
      alert('Please Login ');
      this.router.navigate(['login']);
    }
  }

  login: boolean = true;

  
 
  logout() {
    this.sessionservice.clearSession();

    alert('logout');
    window.location.reload();
    this.router.navigate(['assetCard'])
  }

  
  
  
  logoutOption: boolean = false;


  openLogout(){
    this.logoutOption=!this.logoutOption;
  }
  
  handlerightFieldName(){

      if(this.sessionData=='true')
      {
        this.openLogout()
      }
      if(this.sessionData=='false')
      {
          this.router.navigate(['login']);
      }
  }
  alertNotification()
  {
    alert('Please Login ');
  }

  showProfileDropdown = false;
  isLoggedIn = false; // You can manage login status here

  toggleProfileDropdown() {
    this.showProfileDropdown = !this.showProfileDropdown;
  }

  login1() {
    // Implement your login logic here
    // Example:
    this.isLoggedIn = true; // Simulate successful login
    this.showProfileDropdown = false; // Hide dropdown after login
  }

  employeeProfile(){
    this.router.navigate(['employeeList/:EmployeeId'], { queryParams: { EmployeeId: this.EmplyId } });
  }
}
