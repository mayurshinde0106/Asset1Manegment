import { HttpClient,HttpClientModule, HttpParams} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, ObservedValuesFromArray, throwError } from 'rxjs';
import { Asset } from '../Model/asset.model';

@Injectable({
  providedIn: 'root'
})
export class AssetService {

  //private asset: Asset;

  constructor(private http:HttpClient) { }
  url='http://localhost:42001/'
  
  // registeremployee(employee:any) : Observable<any>{
  //   return this.http.post<any>(this.url,employee).pipe(
  //     catchError(this.handleError)
  //   );
  // }
  
     addAsset(asset:any): Observable<any>{
       return this.http.post<any>(this.url+'PostAssetDetails',asset).pipe(
        catchError(this.handleError)
       );
    } 

    assetList():Observable<any>{
      return this.http.get<any>(this.url+'GetAssetDetails',).pipe(
        catchError(this.handleError)
      )
    }

    deleteAsset(asset:any):Observable<any>{
      debugger
      return this.http.put<any>(this.url+'api/DeleteAssetDetail',asset).pipe(
        catchError(this.handleError)
      )
    }
    
    updateAsset(asset:any):Observable<any>{
      debugger
      return this.http.put<any>(this.url+"api/UpdateAssetDetail",asset).pipe(
        catchError(this.handleError)
      )
    }

    private handleError(error: any) :Observable<never>{
      console.error('An error is occured ',error);
      return throwError(error);
  }

  private a:number=0;
  // setAssetData(asset:Asset){
  //  // debugger
  //   this.asset = asset;
  //   console.log(this.asset);
   
  // }
  setAssetData(a:number){
    // debugger
     this.a = a;
     console.log(this.a);
    
  }



  getAssetData(){
     // debugger
    console.log(this.a);
    return this.a;
  }

  // login
//  private url1='http://localhost:42001/api/GetEmployeeLogin';

  Getemployee(loginData:any): Observable<any>{

      let params = new HttpParams().set('Mail',loginData.Mail).set('Password',loginData.Password);
    return this.http.get<any>(this.url+'api/GetEmployeeLogin', {params}).pipe(
      catchError(this.handleError)
    );
  }

//     private url3='http://localhost:42001/SetEmployeesDetails';
  
  registeremployee(employee:any) : Observable<any>{
    return this.http.post<any>(this.url+'SetEmployeesDetails',employee).pipe(
      catchError(this.handleError)
    );
  }
  
  specificAssetData(Action:string): Observable<any>{

    let params = new HttpParams().set('actions',Action);
    return this.http.get<any>(this.url+"GetCombineAssetDetails",{params}).pipe(
      catchError(this.handleError)
   );
  }


  // All Asset Count

  AssetCount(Action:string): Observable<any>{
    
    let params = new HttpParams().set('actions',Action);
    return this.http.get<any>(this.url+'GetCombineAssetDetails',{params}).pipe(
      catchError(this.handleError)
    );
  }



}
