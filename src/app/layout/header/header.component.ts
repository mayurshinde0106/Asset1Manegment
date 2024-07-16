import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { SessionService } from '../../shared/service/Session/session.service';


@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink,RouterOutlet, RouterLinkActive],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

constructor(private router:Router,private sessionservice:SessionService){}
  viewAsset(){
    console.log("hello");
    this.router.navigate(['/assetlist']); 
  }

  assetList(Actions:string){

    // this.router.navigate(['specificAssetItem'],{queryParams: {Action:Actions}});

    this.router.navigate(['assetlist/:Action'],{queryParams:{Action:Actions}}); 
  }

  login:boolean=true;

  // sessionData=localStorage.getItem('Usersession');
  logout(){
      this.sessionservice.clearSession();

      alert('logout');
  }
}
