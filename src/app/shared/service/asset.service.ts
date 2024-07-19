import { HttpClient, HttpClientModule, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, ObservedValuesFromArray, throwError } from 'rxjs';
import { Asset } from '../Model/asset.model';

@Injectable({
  providedIn: 'root'
})
export class AssetService {

  //private asset: Asset;

  constructor(private http: HttpClient) { }
  url = 'http://localhost:42001/'


  // Add Asset

  addAsset(asset: any): Observable<any> {
    return this.http.post<any>(this.url + 'PostAssetDetails', asset).pipe(
      catchError(this.handleError)
    );
  }


  // Delete Asset
  deleteAsset(asset: any): Observable<any> {
   // debugger
    return this.http.put<any>(this.url + 'api/DeleteAssetDetail', asset).pipe(
      catchError(this.handleError)
    )
  }

  // update Asset
  updateAsset(asset: any): Observable<any> {
   // debugger
    return this.http.put<any>(this.url + "api/UpdateAssetDetail", asset).pipe(
      catchError(this.handleError)
    )
  }



 // Get Asset Data 
 specificAssetData(Action: string): Observable<any> {

  let params = new HttpParams().set('actions', Action);
  return this.http.get<any>(this.url + "GetCombineAssetDetails", { params }).pipe(
    catchError(this.handleError)
  );
}

  // AssetCount for card show
  AssetCount(Action: string): Observable<any> {
    let params = new HttpParams().set('actions', Action);
    return this.http.get<any>(this.url + 'GetCombineAssetDetails', { params }).pipe(
      catchError(this.handleError)
    );
  }

  //errror Handing

  private handleError(error: any): Observable<never> {
    console.error('An error is occured ', error);
    return throwError(error);
  }
    // private a: number = 0;

  // setAssetData(a: number) {
  //   // debugger
  //   this.a = a;
  //   console.log(this.a);

  // }



  // getAssetData() {
  //   // debugger
  //   console.log(this.a);
  //   return this.a;
  // }

}
