import { Component,Input,OnInit } from '@angular/core';
import { AssetService } from '../../shared/service/asset.service';
import { CommonModule } from '@angular/common';
import { Asset } from '../../shared/Model/asset.model';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { parse } from 'path';
import { response,  } from 'express';
import { FormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-update-asset',
  standalone: true,
  imports: [CommonModule,FormsModule,CommonModule],
  templateUrl: './update-asset.component.html',
  styleUrl: './update-asset.component.css'
})
export class UpdateAssetComponent {

   asset!: Asset;
    asset1!:Asset;

// @Input()responseData : any[] =[] ;
// public AssetList : any[] =[];
   constructor(private assetServive: AssetService, private route:ActivatedRoute,private snackBar:MatSnackBar,private router:Router) { }
  conditionList : string[]= ['New',"Good","Used","Poor",'Damaged']
  Statused : string[]=["Active","InActive"];
  AssetList ='mayur 8858'

  Actions:String='AllActive';
//  private asset:any;
  private a:number=0;
  ngOnInit(){
   //   debugger
    this.route.queryParams.subscribe(params =>{
      this.asset={
        AssetId : params['AssetId'],
        Name: params['Name'],
        Category:  params['Category'],
        Condition: params['Condition'],
       Cost: params['Cost'],
        Location:  params['Location'],
        Status:  params['Status'],
        EmployeeId:params['EmployeeId'],
        Action: params['Action']
      }
    })
   this.Actions=this.asset.Action;
    console.log('update page '+this.asset.Status);

  } 
  categories: string[] = ['Category 1', 'Category 2', 'Category 3'];
  onUpdate(){
    console.log(this.asset.Location);
    this.assetServive.updateAsset(this.asset).subscribe( response =>{
      console.log("Asset Data Update ",response);
      this.snackBar.open('Update Save Successfully!' ,'Close',{
        duration:550,
        verticalPosition: 'bottom',
        horizontalPosition:'right',
      })
      setTimeout(()=>{
        
        let act='AllActive';
        // console.log('  action update : '+this.Actions);
        this.router.navigate(['assetlist/:Action'],{queryParams:{Action:act,EmployeeId:-1}});
      },600)
      
    },
    error=>{
      console.log('error occur',error);
    }
  )
  }



}
