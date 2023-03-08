import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LanguageService } from '../language.service';

@Component({
  selector: 'app-user-signin',
  templateUrl: './user-signin.component.html',
  styleUrls: ['./user-signin.component.css']
})
export class UserSigninComponent implements OnInit {

  language : string = 'mr';
  constructor(public translate: TranslateService, private languageservice: LanguageService) {

    
    if(localStorage.getItem("applang") == undefined || localStorage.getItem("applang") == null || localStorage.getItem("applang") == "null"){
      this.language = "mr";
    }else{
      this.language = localStorage.getItem("applang") || 'mr';
    }
    console.log(this.language);
  }

  ngOnInit(): void {
  }


  changeLanguage(ilang : string){
    this.translate.use(ilang);
    localStorage.setItem("applang",ilang);
    this.languageservice.saveLanguage(ilang);
    this.language = ilang;
  }

}
