import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { APIService } from '../../../core/_services/api.service';
import { Constants } from '../../../core/_services/constants.enum';
import { StorageService } from '../../../core/_services/storage.service';
import { LanguageService } from '../../../language.service';
import { TranslateService } from '@ngx-translate/core';
import { ShareableService } from '../../../core/_services/shareable.service';
import { DomSanitizer } from '@angular/platform-browser';
import { environment as env } from '../../../../environments/environment'

@Component({
  selector: 'app-pdf-viewer',
  templateUrl: './pdf-viewer.component.html',
  styleUrls: ['./pdf-viewer.component.css']
})
export class PdfViewerComponent implements OnInit {

  private ngxRouter: Router;
  private service: APIService;

  pdfUrl: any;

  constructor(public sanitizer: DomSanitizer,private shareableService: ShareableService,private translate: TranslateService,private languageservice: LanguageService,private services: APIService,private router: Router,private localStorageAPI: StorageService, public activeRoute: ActivatedRoute) { 

    this.service = services;
    this.ngxRouter = router;
    
  }


  ngOnInit(): void {
    this.activeRoute.queryParams
    .subscribe((params : any) => {
      console.log(params);
      let url =`${env.api}getPDF.php?mobile=${localStorage.getItem(Constants.MOBILE)}&bd=${localStorage.getItem(Constants.BOARD)}&medium=${localStorage.getItem(Constants.MEDIUMNAME)}&standard=${localStorage.getItem(Constants.GRADEID)}&subject=${params.subjectId}`;
      if(params.url){
        url = params.url;
      }

      this.pdfUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);
    });
  }



}
