import { Injectable } from '@angular/core';
import { Constants } from './constants.enum';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  public store(key: Constants, token: any) {
    localStorage.removeItem(key);
    localStorage.setItem(key, token);
  }

  public retrieve(key: Constants) {
    return localStorage.getItem(key);
  }

  public storeComplexData(key: Constants, user: any) {
    localStorage.removeItem(key);
    localStorage.setItem(key, JSON.stringify(user));
  }

  public retrieveComplexData(key: Constants) {
    let data = localStorage.getItem(key) === null ?  null : localStorage.getItem(key); 
    return data === null ?  null : JSON.parse(data);
  }

  public clearStorage(key: Constants) {
    return localStorage.removeItem(key);
    
  }

  public removeStorage() {
    // [Constants.OTP, Constants.ID, Constants.USER_DETAILS, Constants.SUBJECT_ID, Constants.USER_KEY, Constants.TOKEN_KEY, Constants.token, Constants.FIRST_NAME, Constants.SIGN_UP_DATA]
    //Object.values(Constants).forEach(item => localStorage.removeItem(item));
    let lang = localStorage.getItem("applang");
    localStorage.clear();
    localStorage.setItem("applang",lang ? lang : 'mr');
  }

  // public removeStorage(items: string[]) {
  //   items.forEach(item => localStorage.removeItem(item));
  // }

}
