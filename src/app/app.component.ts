import { Component } from '@angular/core';
import { RouterLink, RouterOutlet, Router } from '@angular/router';
import { AddAssetComponent } from './layout/add-asset/add-asset.component';
import { HttpClientModule } from '@angular/common/http';
import { AssetListComponent } from './layout/asset-list/asset-list.component';
import { UpdateAssetComponent } from './layout/update-asset/update-asset.component';
import { HeaderComponent } from './layout/header/header.component';
import { CommonModule } from '@angular/common';
import { SessionService } from './shared/service/Session/session.service';
import { AssetcardComponent } from './layout/assetcard/assetcard.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, AddAssetComponent, AssetListComponent, UpdateAssetComponent, HttpClientModule, RouterLink, HeaderComponent, CommonModule, AssetcardComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'AssetManagement';

  constructor(private router: Router, private sessionservice: SessionService) { }


  ngOnInit() {


    // localStorage.setItem('Usersession', JSON.stringify(''));
    // localStorage.setItem('session', JSON.stringify(false));
    

    // if (typeof localStorage !== 'undefined') {

    //   console.log('User has not logIn');
    //   localStorage.setItem('session',JSON.stringify(false));

    //     }
    // else  {
      
    // }

  }

  // sessionCheck(){
  //   console.log(this.sessionservice.getSession());
  // }
  updateAsset() {
    console.log("hello");
    this.router.navigate(['/update']);
  }

  viewAsset() {
    console.log("hello");
    this.router.navigate(['/assetlist']);
  }

  checkHome(): boolean {
    return this.router.url == '/';
  }
}
