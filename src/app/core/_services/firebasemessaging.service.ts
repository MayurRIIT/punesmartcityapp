import { Injectable } from '@angular/core';
import { AngularFireMessaging } from '@angular/fire/compat/messaging';
import { BehaviorSubject } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class FirebasemessagingService {

  currentMessage = new BehaviorSubject(null);
  
  constructor(private angularFireMessaging: AngularFireMessaging) {
  
    // this.angularFireMessaging.messages.subscribe((msgings) => {
    //     msgings.onMessage = msgings.onMessage.bind(msgings);
    //     msgings.onTokenRefresh=msgings.onTokenRefresh.bind(msgings);
    // })
  }

  requestPermission() {
    this.angularFireMessaging.requestToken.subscribe(
    (token) => {
    console.log(token);
    });
  }

  receiveMessage() {
    // this.angularFireMessaging.messages.subscribe((msg) => {
    //   console.log("show message!", msg);
    //   this.currentMessage.next(msg);
    // })
  }

}
