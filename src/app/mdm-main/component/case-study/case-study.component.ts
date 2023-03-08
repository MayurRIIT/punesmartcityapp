import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { APIService } from '../../../core/_services/api.service';
import { Constants } from '../../../core/_services/constants.enum';
import { StorageService } from '../../../core/_services/storage.service';
import { LanguageService } from '../../../language.service';
import { ordinal_suffix_of_eng,ordinal_suffix_of_mar } from '../../../app.constants';
import { TranslateService } from '@ngx-translate/core';
import { ShareableService } from '../../../core/_services/shareable.service';

@Component({
  selector: 'app-case-study',
  templateUrl: './case-study.component.html',
  styleUrls: ['./case-study.component.css']
})
export class CaseStudyComponent implements OnInit {

  private ngxRouter: Router;
  private service: APIService;

  dataArr: any = [];
  subjectId: string;

  constructor(private shareableService: ShareableService,private translate: TranslateService,private languageservice: LanguageService,private services: APIService,private router: Router,private localStorageAPI: StorageService, public activeRoute: ActivatedRoute) { 

    this.service = services;
    this.ngxRouter = router;
    
  }


  ngOnInit(): void {
    this.dataArr = [{
      thumbnail : 'assets/images/yoganddhyan.svg',
      name : 'Teacher Case',
      path : 'assets/videos/casestudy.pdf'
    }];
  }

  loadData(){

    this.router.navigate(['/mdm-home/pdf-viewer'], { queryParams: { url: 'assets/videos/casestudy.pdf' } });

  }

  backSelectSubject(){
    this.router.navigate(['/mdm-home/home']);
  }

}
