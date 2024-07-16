import { Component, OnInit } from '@angular/core';
import { AssetService } from '../../shared/service/asset.service';
import { response } from 'express';
import { ActivatedRoute, Route, Router, RouterLink, RouterOutlet } from '@angular/router';
import { CommonModule, NgFor } from '@angular/common'
import { UpdateAssetComponent } from '../update-asset/update-asset.component';
import { Asset } from '../../shared/Model/asset.model';
import { MatSnackBar } from '@angular/material/snack-bar';
// import {session} from '../../util';

@Component({
  selector: 'app-asset-list',
  standalone: true,
  imports: [CommonModule,UpdateAssetComponent],
  templateUrl: './asset-list.component.html',
  styleUrl: './asset-list.component.css',
  providers: [AssetService]
})
export class AssetListComponent {

  public navigateFlag : boolean =false;
  public AssetDataList : any[] =[];
  public responseData : any[] =[]; 

  constructor(private asssetService: AssetService, private router: Router, private snackBar:MatSnackBar,private routes :ActivatedRoute) { }
   items: any[] = [];

  // idx:number=1;
  Action:string='';    
  ngOnInit() {
   // debugger

   console.log();
   this.routes.queryParams.subscribe(params => {
    this.Action=params['Action'];
});

    
      console.log( 'Actioned asset list',this.Action);
this.asssetService.specificAssetData(this.Action).subscribe(
  response=>{
      console.log(response);
      this.items=response.data[0]
  },
  error =>{
      console.log(" specificAsset data getting error",error)
  }
)
    
    // this.asssetService.assetList().subscribe(
    //   response => {
    //     console.log("Get data Successfully", response.data[0]);
    //     this.items = response.data[0];
    //   },
    //   error => {
    //     console.log('error occured ', error);
    //   }
    // )
  }
  asset1 ={
    AssetId : 0 ,
    Name:'',
    Category:'',
    Condition:'',
   Cost:0,
    Location:'',
    Status:'',
    EmployeeId:0,
    Action:''
  }
 // asset1!:Asset;
  deleteClick(AssetId :number){

    console.log('delete records '+AssetId);
        this.asset1.AssetId=AssetId;

        this.asssetService.deleteAsset(this.asset1).subscribe(
          response=>{
            console.log("Get data Successfully", response.data[0]);
        this.items = response.data[0];

        this.snackBar.open('delete Save Successfully!' ,'Close',{
          duration:3500,
          verticalPosition: 'bottom',
          horizontalPosition:'right',

        })
        this.ngOnInit()
        // window.location.reload();
      },
      error => {
        console.log('error occured ', error);

        this.snackBar.open('error','close',{
          duration:3500,
          verticalPosition:'bottom',
          horizontalPosition:'right'
        })
      }
        )
  }

  // asset = {
  //   Id: 0,
  //   Name: '',
  //   Category: '',
  //   Condition: '',
  //   Cost: 0,
  //   Location: ''

  // }
  assetClick(asset:Asset) {
    //debugger
  //  this.asssetService.setAssetData(1001);
    this.router.navigate(["update"],{queryParams: {...asset}})
  }

  onAddAsset(){
   // console.log("asset add button work !!! ")
    this.router.navigate(["addAsset"])
  }
}


