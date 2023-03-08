import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LanguageService } from '../language.service';
import { StorageService } from '../core/_services/storage.service';
import { Login } from '../core/models/Login';
import { Router } from '@angular/router';
import { APIService } from '../core/_services/api.service';
import { Constants } from '../core/_services/constants.enum';
import { AngularFireMessaging } from '@angular/fire/compat/messaging';
import { BehaviorSubject } from 'rxjs'
import { FirebasemessagingService } from '../core/_services/firebasemessaging.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  language : string = 'mr';
  mobilenumber : string;
  password : string = "" ;
  private login: Login;
  private ngxRouter: Router;
  private service: APIService;
  showPassword = true;
  type: string = "password";
  passwordicon: string = "eye";
  fcmToken: any =null;
  submitError: string;
  iaccept : any;
  applanguage : string;

  constructor(private angularFireMessaging: AngularFireMessaging,private messagingService: FirebasemessagingService,public translate: TranslateService,private services: APIService, private router: Router, private localStorageAPI: StorageService, private languageservice: LanguageService) {

    this.service = services;
    this.ngxRouter = router;
    
    if(localStorage.getItem("applang") == undefined || localStorage.getItem("applang") == null || localStorage.getItem("applang") == "null"){
      this.language = "mr";
    }else{
      this.language = localStorage.getItem("applang") || 'mr';
    }
    console.log(this.language);

    this.languageservice.retriveLanguage().subscribe((response) => {
      this.applanguage = response;
    });

    // this.angularFireMessaging.
    // this.angularFireMessaging.messaging.subscribe(_messaging) => {
    //   _messaging.onMessage = _messaging.onMessage.bind(_messaging);
    //   _messaging.onTokenRefresh = _messaging.onTokenRefresh.bind(_messaging);
    // })

  }

  ngOnInit(): void {
    this.requestPermission();
  }

  signInFunc(){

  }

  requestPermission() {
    console.log('requestPermission --');
    // const token = this.messaging.requestPermission().then(() => {
    //   return this.messaging.getToken();
    // });
    // this.angularFireMessaging.messages.subscribe(
    //   (messaging) => {
    //     const token = messaging.requestPermission().then(() => {
    //       return messaging.getToken();
    //     });
    //       _messaging.onTokenRefresh = _messaging.onTokenRefresh.bind(_messaging);
    //   }
    // )
    this.angularFireMessaging.requestToken.subscribe((token) => {
      console.log('Permission granted! Save to the server!', token);
      this.fcmToken = token ? token : null;
    }, (error) => {
      console.log(error);
    })

    this.messagingService.requestPermission()
  }


  changeLanguage(ilang : string){
    this.translate.use(ilang);
    localStorage.setItem("applang",ilang);
    this.languageservice.saveLanguage(ilang);
    this.language = ilang;
  }

  showhidepassword() {
    this.showPassword = !this.showPassword;
    this.passwordicon = this.showPassword ? "eye-off" : "eye";
    this.type = this.showPassword ? 'text' : 'password';
  }

  private validateLogin(): boolean {
    if (this.mobilenumber == undefined || this.mobilenumber.length != 10) {
      alert("Please enter valid mobile number");
      return false;
    } else if (this.password == undefined || this.password.length < 6) {
      alert("Please enter valid password");
      return false;
    }else if (this.iaccept == false || this.iaccept == undefined || this.iaccept == null) {
      alert("Please accept privacy policy and terms and conditions");
      return false;
    } else
      return true;
  }

  loginEvent() {
    if (this.validateLogin()) {
      this.login = new Login();
      this.login.mobileNumber = this.mobilenumber;
      this.login.password = this.password;
      //this.login.fcmToken = this.fcmToken;
      this.login.fcmToken = "SAMPLE";
      console.log(this.login.fcmToken);
      this.service.login(this.login).subscribe((response) => {

        console.log("======loginEvent===========>", response);
        if (response && response.length > 0) {

          this.localStorageAPI.store(Constants.FIRST_NAME, response[0].username)
          this.localStorageAPI.store(Constants.LAST_NAME, "")
          this.localStorageAPI.store(Constants.MOBILE, response[0].mobile)
          this.localStorageAPI.store(Constants.token, "token");
          this.localStorageAPI.store(Constants.ID,response[0].mobile);
          this.localStorageAPI.store(Constants.PHOTO,"assets/images/profile.png");
          this.localStorageAPI.store(Constants.BOARD,response[0].board);
          this.localStorageAPI.store(Constants.GRADEID,response[0].standard);
          this.localStorageAPI.store(Constants.MEDIUMID,response[0].medium);
          switch(response[0].medium){
            case "M" : 
                this.localStorageAPI.store(Constants.MEDIUMNAME,'Marathi');
                break;
            case "H" : 
                this.localStorageAPI.store(Constants.MEDIUMNAME,'Hindi');
                break;
            case "E" : 
                this.localStorageAPI.store(Constants.MEDIUMNAME,'English');
                break;  
            case "S" : 
                this.localStorageAPI.store(Constants.MEDIUMNAME,'SemiEnglish');
                break; 
            default :
                this.localStorageAPI.store(Constants.MEDIUMNAME,'Marathi');
                break;     

          }
          
          this.localStorageAPI.store(Constants.GRADE,response[0].standard);
          this.localStorageAPI.store(Constants.GRADEORDER,response[0].standard);
          this.localStorageAPI.store(Constants.USERTYPE,'STUDENT');
          this.localStorageAPI.store(Constants.SUBSCRIPTIONCODEISUSED, 'used');
          this.localStorageAPI.store(Constants.PASSWORD, '123456');
          this.localStorageAPI.store(Constants.LOGINTYPE, 'normal');
          this.localStorageAPI.store(Constants.SCHOOLVERIFIED,  false);
          this.localStorageAPI.store(Constants.SCHOOLID, '');
          this.localStorageAPI.store(Constants.EMAIL,response[0].email);
          this.localStorageAPI.store(Constants.DATACONTENTTYPE, 1);
          this.localStorageAPI.store(Constants.ISUSERLOGIN, 1); 

          // this.localStorageAPI.store(Constants.FIRST_NAME, response.result.firstName)
          // this.localStorageAPI.store(Constants.LAST_NAME, response.result.lastName)
          // this.localStorageAPI.store(Constants.MOBILE, response.result.mobileNumber)
          // this.localStorageAPI.store(Constants.token, response.result.token);
          // this.localStorageAPI.store(Constants.ID,response.result._id);
          // this.localStorageAPI.store(Constants.PHOTO,response.result.profilePic);
          // this.localStorageAPI.store(Constants.GRADEID,response.result.gradeId._id);
          // this.localStorageAPI.store(Constants.MEDIUMID,response.result.mediumId._id);
          // this.localStorageAPI.store(Constants.MEDIUMNAME,response.result.mediumId.name);
          // this.localStorageAPI.store(Constants.GRADE,response.result.gradeId.gradeName);
          // this.localStorageAPI.store(Constants.GRADEORDER,response.result.gradeId.order);
          // this.localStorageAPI.store(Constants.USERTYPE,response.result.userType);
          // this.localStorageAPI.store(Constants.SUBSCRIPTIONCODEISUSED, response.result.SubscriptionCodeUsed);
          // this.localStorageAPI.store(Constants.PASSWORD, response.result.password);
          // this.localStorageAPI.store(Constants.LOGINTYPE, response.result.loginType);
          // this.localStorageAPI.store(Constants.SCHOOLVERIFIED, response.result.schoolVerified ? response.result.schoolVerified : false);
          // this.localStorageAPI.store(Constants.SCHOOLID, response.result.schoolId);
          // if(response.result.divisionId){
          //   this.localStorageAPI.store(Constants.DIVISIONID,response.result.divisionId);
          // }

          // this.localStorageAPI.store(Constants.EMAIL,response.result.email);
          // //this.localStorageAPI.store(Constants.ZOOMEMAIL,response.result.zoomEmail);

          // if(Number(this.localStorageAPI.retrieve(Constants.GRADEORDER)) > 4){
          //   this.localStorageAPI.store(Constants.DATACONTENTTYPE, 0);
          // }else{
          //   this.localStorageAPI.store(Constants.DATACONTENTTYPE, 1);
          // }

          // this.localStorageAPI.store(Constants.SUBSCRIPTIONCODECODE, response.result.SubscriptionCodeCode);
          // this.localStorageAPI.store(Constants.SUBSCRIPTIONCODETITLE, response.result.SubscriptionCodeTitle);
          // this.localStorageAPI.store(Constants.SUBSCRIPTIONCODESECONDLEFT, response.result.SubscriptionCodeSecondsleft);
          // this.localStorageAPI.store(Constants.SUBSCRIPTIONCODEVALIDFROM, response.result.SubscriptionCodeValidFrom);
          // this.localStorageAPI.store(Constants.SUBSCRIPTIONCODEVALIDTO, response.result.SubscriptionCodeValidTo);
  
          // if(response.result.SplashImage)
          //     this.localStorageAPI.store(Constants.SplashImage, response.result.SplashImage);

          // if(response.result.SplashVideo)
          //     this.localStorageAPI.store(Constants.SplashVideo, response.result.SplashVideo);    

          // this.localStorageAPI.store(Constants.UNIQUEID, response.result.uniqueid);
          // this.localStorageAPI.store(Constants.TRANSACTIONID, response.result.transactionid);  
          // this.localStorageAPI.store(Constants.PAYMENTMETHOD, response.result.paymentmethod);  

          // this.localStorageAPI.store(Constants.ISUSERLOGIN, 1);  

          // this.localStorageAPI.store(Constants.CITY, response.result.city);
          // this.localStorageAPI.store(Constants.DISTRICT, response.result.district);  
          // this.localStorageAPI.store(Constants.ADDRESS, response.result.address);
          // this.localStorageAPI.store(Constants.PINCODE, response.result.pincode);


          this.ngxRouter.navigate(['/mdm-home'])
        } else {
          alert(response.responseMessage);
        }
      }, (err) => {
        console.log(err)
        alert("Something went wrong");
      });
    }
  }


}
