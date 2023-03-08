import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
// import { TranslateService } from '@ngx-translate/core';
@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  // private language = ['mr','en',];
  // constructor(public translate: TranslateService) { }
  constructor() { }
  // private TranslateSource = new BehaviorSubject([this.language]);
  public translateSource = new BehaviorSubject<any>('mr');//new BehaviorSubject([]);
  // public translateState = 

  saveLanguage(lang: any) {
    this.translateSource.next(lang);
  }

  retriveLanguage() {
    return this.translateSource.asObservable();
  }
}
