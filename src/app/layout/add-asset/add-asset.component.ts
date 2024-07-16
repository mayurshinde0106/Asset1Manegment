import { CommonModule,NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AssetService } from '../../shared/service/asset.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import {MatSnackBar} from '@angular/material/snack-bar';
import { Asset } from '../../shared/Model/asset.model';
import { SessionService } from '../../shared/service/Session/session.service';

@Component({
  selector: 'app-add-asset',
  standalone: true,
  imports: [FormsModule,CommonModule,],
  templateUrl: './add-asset.component.html',
  styleUrl: './add-asset.component.css',
  providers:[AssetService]
})
export class AddAssetComponent {

  constructor (private http:HttpClient,private assetService:AssetService,  private sessionservice:SessionService, private snackBar:MatSnackBar){}

  asset ={
    AssetId : 0,
    Name:'',
    Category:'',
    Condition:'',
   Cost:0,
    Location:'',
    Status:'',
    EmployeeId:0,
    Action:''
  }
   
  newAsset ={
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

  //asset!:Asset;
  

 // url='http://localhost:42001/PostAssetDetails'

 Statused : string[]=["Active","InActive"];
 conditionList : string[]=["Good","Medium","Bad"]
 
 newCategory : string='';
 showCategoryInput : boolean=false;
 onCategoryChange(event:any)
 {
    if(event.target.value='other'){
        this.showCategoryInput=true;
    }
    else{
      this.showCategoryInput=false;
    }
 }

//  addCategory(){
//   if(this.newCategory && !this.categoryList.includes(this.newCategory))
//   {
//     this.categoryList.push(this.newCategory);
//     this.asset.Category=this.newCategory;
//     this.newCategory='';
//     this.showCategoryInput=false;
//   }
//  }

sessionData:any;
newAssetAdd : boolean =false;
onSubmit(){
 // debugger
 this.sessionData=this.sessionservice.getSession();
    console.log(this.asset);
    
   
    console.log(this.sessionData); 
    this.asset.EmployeeId =this.sessionData.Id;
    this.assetService.addAsset(this.asset).subscribe(
      response=>{
              console.log("Added Successfully",response.data);  

              this.newAsset.Name=this.asset.Name; this.newAsset.Category=this.asset.Category; this.newAsset.Condition=this.asset.Condition; this.newAsset.Cost=this.asset.Cost; this.newAsset.Location=this.asset.Location; this.newAsset.Status=this.asset.Status;

              this.asset.Name=''; this.asset.Category=''; this.asset.Condition=''; this.asset.Cost=0; this.asset.Location=''; this.asset.Status;

              
              this.snackBar.open('Item Save Successfully!' ,'Close',{
                duration:3500,
                verticalPosition: 'bottom',
                horizontalPosition:'right',
              
              })
              this.newAssetAdd=true;
            },
            error=>{
              console.log("Failed",error)
              this.snackBar.open('Failed to save item','Close',{
                duration:3500,
                verticalPosition:'bottom',
                horizontalPosition:'right'
              })
            }
    )
 }
}