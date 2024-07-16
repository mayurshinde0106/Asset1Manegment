import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  private storageKey ='Usersession';

  // sessio:boolean= localStorage.getItem('session');

  constructor() {    }

  // setSession(data:any):void{
  //   localStorage.setItem(this.storageKey,JSON.stringify(data));
  // }

  getSession():void  {
    const sessionData = localStorage.getItem(this.storageKey);
    return sessionData? JSON.parse(sessionData):null;
  }

  clearSession():void{
    localStorage.removeItem(this.storageKey);
    localStorage.setItem('session',JSON.stringify('false'));
  }
}
