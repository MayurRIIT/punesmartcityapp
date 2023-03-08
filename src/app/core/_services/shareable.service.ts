import { Injectable } from '@angular/core';
import { Constants } from './constants.enum';
import { Observable, Subject } from 'rxjs';

@Injectable()
export class ShareableService {

  licenceRenewal: Subject<any> = new Subject();
  profileDrawer: Subject<any> = new Subject();

  constructor() {
   
  }
}