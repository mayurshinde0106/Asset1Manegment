import { Component,Input } from '@angular/core';
import { Router } from '@angular/router';
import { AssetService } from '../../shared/service/asset.service';
import { response } from 'express';
import { error } from 'console';


@Component({
  selector: 'app-assetcard',
  standalone: true,
  imports: [],
  templateUrl: './assetcard.component.html',
  styleUrl: './assetcard.component.css'
})
export class AssetcardComponent {

  @Input() name!: string;
  @Input() number!:string;


  constructor (private router:Router,private assetService:AssetService)  {}

  AllAssetCount:number=0;
  InActiveAssetCount:number=0;
  ActiveAssetCount:number=0;

  ngOnInit(){

    // count for all asset 
    this.assetService.AssetCount('CountAll').subscribe(
      response=>{
          this.AllAssetCount=response.data[0][""];
          console.log('Get All Asset count  ! ',this.AllAssetCount);
      },
      error=>{
        console.log("asset All card count error",error);
      }
    )

    // count for all Active asset

    this.assetService.AssetCount('CountAllActive').subscribe(
      response=>{
       
        this.ActiveAssetCount=response.data[0][""]
        console.log('Get Active  Asset count  ! ',this.ActiveAssetCount);
      },
      error=>{
        console.log("asset Active card ount error",error);
      }
    )

    // count for all InActive asset

    this.assetService.AssetCount('CountAllInActive').subscribe(
      response=>{
        this.InActiveAssetCount=response.data[0][""];
        console.log('Get InActive Asset count ! ',this.InActiveAssetCount);
      },
      error=>{
        console.log("asset Active card ount error",error);
      }
    )
  }

  getSpecificAsset(Actions:string)
  {   
    console.log("click on the card :: ! ",Actions);
      this.router.navigate(['assetlist/:Action'],{queryParams: {Action:Actions}});
  }
}
