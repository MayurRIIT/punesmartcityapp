import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
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
  selector: 'app-video-viewer',
  templateUrl: './video-viewer.component.html',
  styleUrls: ['./video-viewer.component.css']
})
export class VideoViewerComponent implements OnInit {

  private ngxRouter: Router;
  private service: APIService;
  @ViewChild('videoplayer') private videoplayer: ElementRef; toggleVideo(event: any) { 
    this.videoplayer.nativeElement.play(); // this.videoplayer.nativeElement.pause();
  }

  videoUrl: any;

  constructor(public sanitizer: DomSanitizer,private shareableService: ShareableService,private translate: TranslateService,private languageservice: LanguageService,private services: APIService,private router: Router,private localStorageAPI: StorageService, public activeRoute: ActivatedRoute) { 

    this.service = services;
    this.ngxRouter = router;
    
  }


  ngOnInit(): void {
    this.activeRoute.queryParams
    .subscribe((params : any) => {
      console.log(params);
      if(params.videoUrl){
        this.videoUrl = params.videoUrl;
      }else{
        this.videoUrl = 'http://edutab.in/'+params.videoId;
      }
    });
  }



}
