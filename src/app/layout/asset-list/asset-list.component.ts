import { Component, OnInit, TemplateRef, ViewChild, ViewContainerRef } from '@angular/core';
import { AssetService } from '../../shared/service/asset.service';
import { response } from 'express';
import { ActivatedRoute, Route, Router, RouterLink, RouterOutlet } from '@angular/router';
import { CommonModule, NgFor, ɵnormalizeQueryParams } from '@angular/common'
import { UpdateAssetComponent } from '../update-asset/update-asset.component';
import { Asset } from '../../shared/Model/asset.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SessionService } from '../../shared/service/Session/session.service';
import { Console } from 'node:console';
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

  constructor(private asssetService: AssetService, private router: Router, private snackBar: MatSnackBar, private routes: ActivatedRoute, private viewContainerRef: ViewContainerRef, private sessionService: SessionService) { }
  items: any[] = [];

  UpdateDeleteOption:boolean=false;
  Action: string = '';
  loginUser : string ='';
  sessionData:any;
  EmployeeId:number = -1;
  idx:number=0;
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
    Action: ''
  }
  // asset1!:Asset;
  deleteClick() {
    this.closePopup();

    console.log('delete records ' + this.AssetNewId);
    this.asset1.AssetId = this.AssetNewId;

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
  openPopup(data: number) {
    this.AssetNewId = data;
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
    this.router.navigate(['employeeList/:EmployeeId'], { queryParams: { EmployeeId: EId } });
    console.log();
  }
  employeeAuth: boolean = true;

  
  incrementIndex()
  {
    this.idx=this.idx+1;
    return this.idx;
  }

}


