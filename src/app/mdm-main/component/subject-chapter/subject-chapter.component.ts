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
  selector: 'app-subject-chapter',
  templateUrl: './subject-chapter.component.html',
  styleUrls: ['./subject-chapter.component.css']
})
export class SubjectChapterComponent implements OnInit {

  private ngxRouter: Router;
  private service: APIService;
  gradeName: any = "-";
  videoCount: any = 0;
  chapters: any = [];
  watchedHistory: any = [];
  subjectId: string;
  subjectName: any
  subjectLang: string = 'Eng';

  constructor(private shareableService: ShareableService,private translate: TranslateService,private languageservice: LanguageService,private services: APIService,private router: Router,private localStorageAPI: StorageService, public activeRoute: ActivatedRoute) { 

    this.service = services;
    this.ngxRouter = router;
    
  }


  ngOnInit(): void {
    this.activeRoute.queryParams
      .subscribe((params : any) => {
        console.log(params);
        this.subjectId = params.subjectId;
        this.subjectName = params.subjectName;
        this.subjectLang = params.subjectLang;

        console.log("=========subjectId=====>", this.subjectId,this.subjectLang);
        this.languageservice.retriveLanguage().subscribe((response) => {
          let language = response;
          if(language == 'mr'){
            this.gradeName = ordinal_suffix_of_mar(Number(this.localStorageAPI.retrieve(Constants.GRADEORDER)));
          }else{
            this.gradeName = ordinal_suffix_of_eng(Number(this.localStorageAPI.retrieve(Constants.GRADEORDER)));
          }
        });
	    //  this.gradeName = this.localStorageAPI.retrieve(Constants.GRADE);
        this.GetChapters();
        //this.getWatchedHistory();
      });
  }

  viewPdf(){
    this.router.navigate(['/mdm-home/pdf-viewer'], { queryParams: { subjectId: this.subjectId } });
  }

  playVideo(item : any){
    
    // let videoName = '1.mp4';
    // if(this.subjectId == 'English'){
    //   videoName = '2.mp4'
    // }
    // if(this.subjectId == 'Maths1'){
    //   videoName = '3.mp4'
    // }
    this.router.navigate(['/mdm-home/video-viewer'], { queryParams: { videoUrl: item.url } });

  }

  // GetChapters() {
  //   this.services.getChapterList(this.subjectId,localStorage.getItem(Constants.DATACONTENTTYPE)).subscribe((response) => {
  //     console.log('=======response========&&&&&&&&&&&&&==========>', response);
  //     if(response && response.length > 0)
  //       this.chapters = response;
  //   });
  // }

  GetChapters() {
    this.services.getChapterList(this.subjectId,localStorage.getItem(Constants.DATACONTENTTYPE)).subscribe((response) => {
      console.log('=======response========&&&&&&&&&&&&&==========>', response);
      if (response.status = "ACTIVE") {
        this.chapters = [];

        this.videoCount = 0;
        response.result.forEach((element : any) => {
            this.videoCount = this.videoCount + (element.videoId ? element.videoId.length : 0);
            if(element.videoId && element.videoId.length > 0){
              element.videoId.sort(function (a : any, b : any) {
                return a.videoNumber - b.videoNumber;
              });
              this.chapters.push(element);
            }
        });
        console.log(this.chapters);
      }
    });
  }

  //GET all Get Watched History
  getWatchedHistory() {
    this.watchedHistory = [];
    this.services.getWatchedHistory(this.subjectId,localStorage.getItem(Constants.DATACONTENTTYPE)).subscribe((response) => {
      console.log('=======response========getWatchedHistory==========>', response);
      if (response.status = "ACTIVE") {
        response.result.forEach((element : any) => {
          element.percentage = Math.floor((element.duration / element.totalDuration) * 100);
        });
        this.watchedHistory = response.result;
        
        
      }
    });

  }
 
  GetVideo(chapterItem : any,iChapterName : string, iIndex : number) {
    console.log(chapterItem);
    localStorage.setItem('playnext', 'false');
    localStorage.setItem('videoIndex', iIndex+"");

    let interactiveVideoModule = false;
    let interactiveVideoModuleTestId = "";
    if(chapterItem.testIds && chapterItem.testIds.length){
        if(chapterItem.testIds.length > 0){
          interactiveVideoModuleTestId = chapterItem.testIds[0];
          interactiveVideoModule = true;
        }
    }
    this.router.navigate(['/mdm-home/video-details'], { 
        queryParams: { 
          parentModule : "/mdm-home/subject-chapter", 
          parentModuleParam :  JSON.stringify({ subjectId: chapterItem.subjectId, subjectName: this.subjectName }),
          videoUrl: chapterItem.cloudFlareVideoId ? chapterItem.cloudFlareVideoId : chapterItem.url,
          videoType: chapterItem.cloudFlareVideoId ? "CLOUDFLARE" : "SERVERURL",
          interactiveVideoModuleTestId : interactiveVideoModuleTestId,
          interactiveVideoModule : interactiveVideoModule,
          title: chapterItem.title, 
          videoIndex: iIndex, 
          videoCount : this.videoCount,
          chapterLength : this.chapters.length,
          videoId : chapterItem._id,
          description : chapterItem.description || "", 
          chapterId: chapterItem.chapterId, 
          subjectId: chapterItem.subjectId, 
          chapterName : iChapterName,
          subjectName: this.subjectName, 
        }
    });
        
  }

  gotoQuestionList(Id: string) {

      this.services.getTestList(Id,localStorage.getItem(Constants.DATACONTENTTYPE)).subscribe(
	      (response) => {
            if (response.responseCode == 200) {
              let testList = response.result;
              console.log(testList);
              if(testList && testList.length > 0){

                //for(let i = 0; i < testList.length ; i++){
                  //if(testList[i].testTitle == 'chaptertest501'){
                        const query = {
                              queryParams: {
                                subjectId: this.subjectId,
                                subjectName: this.subjectName,
                                chapterId: Id,
                                testId: testList[0]._id,
                                parentModule : "subject", 
                                parentModuleParam :  JSON.stringify({ subjectId: this.subjectId, subjectName: this.subjectName }),
                              }
                        };
			                  localStorage.setItem('fromVideo', 'false');
                        this.router.navigate(['/question'], query);
                        //break;
                //  }
               // }
              }
            } 
	      }, (err) => {
		        //alert("Something went wrong");
	      }
      );
  }

  loadContinueReadingVideo(iVideo : any){

    this.services.getVideoListByChapterId(iVideo.videoId.chapterId._id,localStorage.getItem(Constants.DATACONTENTTYPE)).subscribe(
      (response) => {
          console.log('=======response========getVideoListByChapterId==========>', response);

          if (response.responseCode == 200) {
            let videolist = response.result;
            console.log(videolist);
            if(videolist && videolist.length > 0){

              videolist.sort(function (a : any, b : any) {
                return a.videoNumber - b.videoNumber;
              });

              let index = 0;
              for(let i = 0 ; i < videolist.length ; i++){
                if(videolist[i]._id == iVideo.videoId._id){
                  index = i;
                  break;
                }
              }

              localStorage.setItem('playnext', 'false');
              localStorage.setItem('videoIndex', index+"");


              let _queryParams = { 
                chapterId: iVideo.videoId.chapterId._id,
                chapterName: iVideo.videoId.chapterId.title,
                description: iVideo.videoId.description,
                videoId : iVideo.videoId._id,
                subjectId:  this.subjectId,
                subjectName: this.subjectName,
                title: iVideo.videoId.title,
                videoCount : this.videoCount,
                chapterLength : this.chapters.length,
                videoUrl: iVideo.videoId.cloudFlareVideoId ? iVideo.videoId.cloudFlareVideoId : iVideo.videoId.url,
                videoType: iVideo.videoId.cloudFlareVideoId ? "CLOUDFLARE" : "SERVERURL",
                videoIndex: index,
                parentModule : "subject", 
                interactiveVideoModule : false,
                parentModuleParam :  JSON.stringify({ subjectId: this.subjectId, subjectName: this.subjectName }),
            }    
            this.router.navigate(['/mdm-home/video-details'], { queryParams: _queryParams  });

              
              
            }
          } 
      }, (err) => {
          //alert("Something went wrong");
      }
    );
      
    
  }

  
  backSelectSubject(){
    this.router.navigate(['/mdm-home/home']);
  }

}
