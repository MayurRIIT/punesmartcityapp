import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { LanguageService } from '../language.service';
import { Constants } from '../core/_services/constants.enum';
import { ShareableService } from '../core/_services/shareable.service';
import { StorageService } from '../core/_services/storage.service';

@Component({
  selector: 'app-mdm-main',
  templateUrl: './mdm-main.component.html',
  styleUrls: ['./mdm-main.component.css']
})
export class MdmMainComponent implements OnInit {

  drawerType : string ;
  openDrawerFlag : boolean = false;

  name: any;
  profilePic: any;
  ClassGrade: any;


  constructor(
    public translate: TranslateService,
    public router : Router,
    private localStorageAPI: StorageService,
    private shareableService: ShareableService,
    private languageservice: LanguageService) {
      translate.addLangs(['en', 'mr']);
      let lang = (localStorage.getItem("applang") == undefined || localStorage.getItem("applang") == null || localStorage.getItem("applang") == "null") ? "mr" : localStorage.getItem("applang") ; //this.translate.getDefaultLang();
      translate.setDefaultLang(lang || 'mr');

    }

    ngOnInit(): void {
      this.shareableService.profileDrawer.subscribe(data => {
        console.log("----profileDrawer-----");
        console.log(data);
        if(data == "OPEN"){
          this.openDrawer();

          this.name = this.localStorageAPI.retrieve(Constants.FIRST_NAME) + " " + this.localStorageAPI.retrieve(Constants.LAST_NAME);
          this.profilePic = this.localStorageAPI.retrieve(Constants.PHOTO);
          this.ClassGrade = this.localStorageAPI.retrieve(Constants.GRADEORDER);

        }
  
        if(data == "CLOSE"){
          this.closeFunc();
        }
        // decoded
      });

    }

    viewPdf(){
      this.closeFunc();
      this.router.navigate(['/mdm-home/pdf-viewer'], { queryParams: { url: 'assets/videos/medical.pdf' } });
    }

    openDrawer(){
      this.openDrawerFlag = true;
    }
    closeFunc(){
      this.openDrawerFlag = false;
    }
}
