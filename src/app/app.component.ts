import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LanguageService } from './language.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'mdm-web';

  constructor(
    public translate: TranslateService,
    private languageservice: LanguageService) {
      translate.addLangs(['en', 'mr']);
      let lang = (localStorage.getItem("applang") == undefined || localStorage.getItem("applang") == null || localStorage.getItem("applang") == "null") ? "mr" : localStorage.getItem("applang") ; //this.translate.getDefaultLang();
      translate.setDefaultLang(lang || 'mr');

    }
}
