import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LanguageService } from '../language.service';

@Component({
  selector: 'app-user-onboarding',
  templateUrl: './user-onboarding.component.html',
  styleUrls: ['./user-onboarding.component.css']
})
export class UserOnboardingComponent implements OnInit {

  onBoardingPageIndex : number = 1;
  language : string = 'mr';
  constructor(public translate: TranslateService, private languageservice: LanguageService) {

    
    if(localStorage.getItem("applang") == undefined || localStorage.getItem("applang") == null || localStorage.getItem("applang") == "null"){
      this.language = "mr";
    }else{
      this.language = localStorage.getItem("applang") || 'mr';
    }

    if(localStorage.getItem("onboardingIndex") == undefined || localStorage.getItem("onboardingIndex") == null || localStorage.getItem("onboardingIndex") == "null"){
      this.onBoardingPageIndex = 1;
      localStorage.setItem("onboardingIndex","1");
    }else{
      this.onBoardingPageIndex = Number(localStorage.getItem("onboardingIndex") || 1);
    }
    console.log(this.language);
  }

  ngOnInit(): void {
  }

  gotoPage(iIndex : number){
    this.onBoardingPageIndex = iIndex;
    localStorage.setItem("onboardingIndex",iIndex+"");
  }

  navigateToSignin(){

  }

  changeLanguage(ilang : string){
    this.translate.use(ilang);
    localStorage.setItem("applang",ilang);
    this.languageservice.saveLanguage(ilang);
    this.language = ilang;
  }
  
}
