import { CanActivateFn,Router,ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Inject } from '@angular/core';
import { Util } from '../../util';
export const authGuard: CanActivateFn = (route:ActivatedRouteSnapshot, state:RouterStateSnapshot) => {



// const router:Router=Inject(Router);

  //  
 // debugger
  let session=  true   ///localStorage.getItem('session');


  const protectR:string[]=['/addAsset','/assetlist/:Action','/update', '/assetCard'];
  const router=Inject(Router);
  
//  return protectR.includes(state.url) && session==='false'? false:true;
  return true
};
