import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AssetService } from '../../shared/service/asset.service';
import { response } from 'express';
import { error } from 'console';
import { SessionService } from '../../shared/service/Session/session.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-assetcard',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './assetcard.component.html',
  styleUrl: './assetcard.component.css'
})
export class AssetcardComponent {

  @Input() name!: string;
  @Input() number!: string;


  constructor(private router: Router, private assetService: AssetService, private sessionService: SessionService) { }

  AllAssetCount: number = 0;
  InActiveAssetCount: number = 0;
  ActiveAssetCount: number = 0;
  DeleteCount: number = 0;

  sessionData: any
  ngOnInit() {

    // count for all asset 

    if (typeof localStorage !== 'undefined') {
      this.sessionData = localStorage.getItem('session');
    } else {

      console.warn('localStorage is not available.');
    }

    this.assetService.AssetCount('Count').subscribe(
      response => {
        // this.AllAssetCount=response.data[0]["CountAll"];
        this.AllAssetCount=response.data[0][0]["CountAll"];
        this.ActiveAssetCount=response.data[1][0]["CountAllActive"];
        this.InActiveAssetCount=response.data[2][0]["CountAllInActive"];
        this.DeleteCount=response.data[3][0]["CountDelete"];
        console.log('Get All Asset count  ! ', response.data);
        console.log('AllAssetCount : '+response.data[0][0]["CountAll"]+' ActiveAssetCount : '+this.ActiveAssetCount+" InActiveAssetCount : "+this.InActiveAssetCount+'CountDelete '+this.DeleteCount)

      },
      error => {
        console.log("asset All card count error", error);
      }
    )

    console.log('AllAssetCount : '+this.AllAssetCount+' ActiveAssetCount : '+this.ActiveAssetCount+" InActiveAssetCount : "+this.InActiveAssetCount+'CountDelete '+this.DeleteCount)
  }


  getSpecificAsset(Actions: string) {
    debugger
    console.log("click on the card :: ! ", Actions);
    this.router.navigate(['assetlist/:Action'], { queryParams: { Action: Actions ,EmployeeId:-1} });
  }
}
