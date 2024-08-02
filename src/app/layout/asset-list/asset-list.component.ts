import { Component, OnInit, TemplateRef, ViewChild, ViewContainerRef } from '@angular/core';
import { AssetService } from '../../shared/service/asset.service';
import { response } from 'express';
import { ActivatedRoute, Route, Router, RouterLink, RouterOutlet } from '@angular/router';
import { CommonModule, NgFor, ɵnormalizeQueryParams } from '@angular/common'
import { UpdateAssetComponent } from '../update-asset/update-asset.component';
import { Asset } from '../../shared/Model/asset.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SessionService } from '../../shared/service/Session/session.service';
import { Console, error } from 'node:console';
// import {session} from '../../util';

@Component({
  selector: 'app-asset-list',
  standalone: true,
  imports: [CommonModule, UpdateAssetComponent],
  templateUrl: './asset-list.component.html',
  styleUrl: './asset-list.component.css',
  providers: [AssetService]
})
export class AssetListComponent {
  @ViewChild('OpenPopup', { static: true }) openPopupTemplate!: TemplateRef<any>;
  public navigateFlag: boolean = false;
  public AssetDataList: any[] = [];
  public responseData: any[] = [];
  public AssetNewId: number = 0
  public AssetDeleteStatus: string= '';

  public popUpOperation:string='';

  constructor(private asssetService: AssetService, private router: Router, private snackBar: MatSnackBar, private routes: ActivatedRoute, private viewContainerRef: ViewContainerRef, private sessionService: SessionService) { }
  items: any[] = [];

  UpdateDeleteOption:boolean=false;
  Action: string = '';
  loginUser : string ='';
  sessionData:any;
  EmployeeId:number = -1;
  idx:number=0;
  EmployeeRole:string='';
  userId:number=0;
  ngOnInit() {

    this.idx=0;
    // debugger
    console.log();
    this.routes.queryParams.subscribe(params => {
      this.Action = params['Action'];
      this.EmployeeId= params['EmployeeId'];
      
      console.log(this.EmployeeId);
    });

    console.log(' Actioned asset list', this.Action);
    this.asssetService.specificAssetData(this.Action).subscribe(
      response => {
        console.log(response);
        this.items = response.data[0]
        console.log(this.items);
      },
      error => {
        console.log(" specificAsset data getting error", error)
      }
    )

   

    if (typeof localStorage !== 'undefined') {

      this.sessionData =this.sessionService.getSession();


      this.loginUser=this.sessionData.Name;
      this.EmployeeRole=this.sessionData.EmployeeRole;
      this.userId=this.sessionData.Id;
      
      console.log('update button localstroge : '+this.sessionData.Name);

      
  } else {
      
    console.log('local stroge error')
  }

  
  }
  asset1 = {
    AssetId: 0,
    Name: '',
    Category: '',
    Condition: '',
    Cost: 0,
    Location: '',
    Status: '',
    EmployeeId: 0,
    DeleteStatus:'',
    Action: ''
  }
  // asset1!:Asset;

  // change the delete status of Asset

  deleteStatusClick(){

    this.closePopup();

    console.log('change delete status ' + this.AssetNewId);
    this.asset1.AssetId = this.AssetNewId;

    if(this.EmployeeRole=="L1"){
      this.asset1.DeleteStatus='Pending';

      this.asssetService.deleteAssetStatus(this.asset1).subscribe(
        response => {
          console.log("Get data Successfully", response.data[0]);
          this.items = response.data[0];
  
          this.snackBar.open('delete status change Successfully!', 'Close', {
            duration: 3500,
            verticalPosition: 'bottom',
            horizontalPosition: 'right',
  
          })
          this.ngOnInit()
        },
        error => {
          console.log('error occured ', error);
  
          this.snackBar.open('error', 'close', {
            duration: 3500,
            verticalPosition: 'bottom',
            horizontalPosition: 'right'
          })
        }
      )
  
    }

    if(this.EmployeeRole=="Admin" &&   this.AssetDeleteStatus=='Reject')
    {
      this.asset1.DeleteStatus='Approve';

      this.asssetService.deleteAssetStatus(this.asset1).subscribe(
        response => {
          console.log("Get data Successfully", response.data[0]);
          this.items = response.data[0];
  
          this.snackBar.open('delete status Approve Successfully!', 'Close', {
            duration: 3500,
            verticalPosition: 'bottom',
            horizontalPosition: 'right',
  
          })
          this.ngOnInit()
        },
        error => {
          console.log('error occured ', error);
  
          this.snackBar.open('error', 'close', {
            duration: 3500,
            verticalPosition: 'bottom',
            horizontalPosition: 'right'
          })
        }
      )
    }
    else if(this.EmployeeRole=="Admin" && this.AssetDeleteStatus=='Approve')
      {
        this.asset1.DeleteStatus='Delete';

        this.asssetService.deleteAssetStatus(this.asset1).subscribe(
          response => {
            console.log("Get data Successfully", response.data[0]);
            this.items = response.data[0];
    
            this.snackBar.open('delete status change Successfully!', 'Close', {
              duration: 3500,
              verticalPosition: 'bottom',
              horizontalPosition: 'right',
    
            })
            this.ngOnInit()
          },
          error => {
            console.log('error occured ', error);
    
            this.snackBar.open('error', 'close', {
              duration: 3500,
              verticalPosition: 'bottom',
              horizontalPosition: 'right'
            })
          }
        )
        this.deleteClick();
      }
    else if(this.EmployeeRole=='Admin' && this.AssetDeleteStatus=='Delete')
    {
      this.deleteClick();
    }
    
  }


  deleteClick() {
    this.closePopup();

    console.log('delete records ' + this.AssetNewId);
    this.asset1.AssetId = this.AssetNewId;
    this.asset1.DeleteStatus='Delete'
    this.asssetService.deleteAsset(this.asset1).subscribe(
      response => {
        console.log("Get data Successfully", response.data[0]);
        this.items = response.data[0];

        this.snackBar.open('delete Save Successfully!', 'Close', {
          duration: 3500,
          verticalPosition: 'bottom',
          horizontalPosition: 'right',

        })
        this.ngOnInit()
      },
      error => {
        console.log('error occured ', error);

        this.snackBar.open('error', 'close', {
          duration: 3500,
          verticalPosition: 'bottom',
          horizontalPosition: 'right'
        })
      }
    )
  }
  openPopup(data: number,status:string,Operation:string) {
    this.AssetNewId = data;
    this.AssetDeleteStatus=status;
    this.popUpOperation=Operation;
    this.viewContainerRef.createEmbeddedView(this.openPopupTemplate);
  }

  closePopup() {
    this.viewContainerRef.clear();
  }

  assetClick(asset: Asset) {
    //debugger
    this.router.navigate(["update"], { queryParams: { ...asset } })
  }

  onAddAsset() {
    this.router.navigate(["addAsset"])
  }

  
  EmployeeDetails(EId: number) {

    if(this.EmployeeRole=="Admin" || EId==this.userId)
    {
      this.router.navigate(['employeeList/:EmployeeId'], { queryParams: { EmployeeId: EId } });
      console.log();
    }
  }
  employeeAuth: boolean = true;

  
  incrementIndex()
  {
    this.idx=this.idx+1;
    return this.idx;
  }


  recoveryAsset(assetId:number){
    

    debugger
    this.asset1.AssetId=assetId;
    this.asset1.DeleteStatus='Approve';
    this.asssetService.recoveryAsset(this.asset1).subscribe(
      response=>{
          console.log('Asset Reconvery Successfully '+assetId);

          this.ngOnInit();
      },
      error=>{
        console.log('Asset Reconvery error ',error);
      }
    )
  }

}


