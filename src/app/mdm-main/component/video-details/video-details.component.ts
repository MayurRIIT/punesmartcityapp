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
  selector: 'app-video-details',
  templateUrl: './video-details.component.html',
  styleUrls: ['./video-details.component.css']
})
export class VideoDetailsComponent implements OnInit {

  private ngxRouter: Router;
  private service: APIService;

  gradeName: any = "-";
  videoCount: number = 0;
  chapterLength: number = 0;

  watchedHistory: any = [];
  subjectId: string;
  subjectName: string;
  videoUrl: string
  videoType: string = "CLOUDFLARE";
  videoTitle: string
  chapterName: string
  chapterId: string
  description: string
  videoIndex: number
  isNextVideoAvailable: any
  videoLoaded : boolean = false

  currentTime: number = 0;

  currentAudio: any = null;
  currentPDf: any;
  currentTest : any;
  currentEBook: any;

  parentModule: any;
  parentModuleParam: any;
  PassedParams : any

  videoList: any = [];
  videoId: string;
  interactiveVideoModule : boolean = false
  interactiveVideoModuleTestId : any

  contentType : string =localStorage.getItem(Constants.DATACONTENTTYPE) || 'REVISION'
  videoMappingList: any = []

  hideAudioLesson : boolean = false

  isVideoLiked : boolean = false
  isBookmarkVideoLiked : boolean = false
  videolikeid : any;
  bookmark_id : any;
  videorating : any;
  lastvideorating : any;
  bookmarksuccessmessage : any;
  disbookmarksuccessmessage : any;

  constructor(private shareableService: ShareableService,private translate: TranslateService,private languageservice: LanguageService,private services: APIService,private router: Router,private localStorageAPI: StorageService, public activeRoute: ActivatedRoute) { 

    this.service = services;
    this.ngxRouter = router;
    
    this.translate.get('alert.bookmarksuccess').subscribe((text:string) => {
      this.bookmarksuccessmessage = text;
    });

    this.translate.get('alert.disbookmarksuccess').subscribe((text:string) => {
      this.disbookmarksuccessmessage = text;
    });

  }

  ngOnInit(): void {

    this.activeRoute.queryParams
      .subscribe(params => {
        console.log(params);
       
        this.PassedParams = params;
        this.videoUrl = params.videoUrl;
        this.videoType = params.videoType;
        this.videoTitle = params.title;
        this.chapterId = params.chapterId;
        this.videoCount = params.videoCount;
        this.chapterLength = params.chapterLength;
        this.chapterName = params.chapterName;
        this.subjectName = params.subjectName;
        this.subjectId = params.subjectId;
        this.description = params.description;
        this.parentModule = params.parentModule;
        this.parentModuleParam = JSON.parse(params.parentModuleParam);
        this.interactiveVideoModule = params.interactiveVideoModule == "false" ? false : true;
        this.interactiveVideoModuleTestId = params.interactiveVideoModuleTestId;
//        this.videoIndex = Number(params.videoIndex);
	      const vIndex = localStorage.getItem('videoIndex');
        this.videoIndex = Number(vIndex);
        this.videoId = params.videoId;

        this.languageservice.retriveLanguage().subscribe((response) => {
          let language = response;
          if(language == 'mr'){
            this.gradeName = ordinal_suffix_of_mar(Number(this.localStorageAPI.retrieve(Constants.GRADEORDER)));
          }else{
            this.gradeName = ordinal_suffix_of_eng(Number(this.localStorageAPI.retrieve(Constants.GRADEORDER)));
          }
        });
        
        this.getVideoListByChapterId();

      });
  }

  getVideoListByChapterId(){
    this.services.getVideoListByChapterId(this.chapterId,localStorage.getItem(Constants.DATACONTENTTYPE)).subscribe(
      (response) => {
          console.log('=======response========getVideoListByChapterId==========>', response);

          if (response.responseCode == 200) {
            let videolist = response.result;
            console.log(videolist);
            if(videolist && videolist.length > 0){

              videolist.sort(function (a : any, b: any) {
                return a.videoNumber - b.videoNumber;
              });

              this.videoList = videolist;               

              
              this.isNextVideoAvailable = true;
              if(this.videoIndex == (this.videoList.length - 1)){
                this.isNextVideoAvailable = false;
              }
      
              if(this.videoList.length == 0){ // For Search module video click
                this.isNextVideoAvailable = false;
              }
                  
              console.log("=========vedioUrl=====>", this.videoUrl, this.videoTitle, this.videoType);
              this.GetAudios();
              this.GetTestList();
              this.GetAllPdfs();
              this.getEBook();
             
              const playnext = localStorage.getItem('playnext');
              console.log('playnext', playnext)
              console.log('this.isNextVideoAvailable', this.isNextVideoAvailable)
              if (playnext === 'true') {
                if (this.isNextVideoAvailable) {
                  this.PlayNextVideo();
                  localStorage.setItem('playnext', 'false');
                }else{
                  this.fechChapters();
                }
              }else{
                this.getVideoRelatedData();
                setTimeout(()=>{    
                  //play video code
                 
                },1000)
              }
              
            }
          } 
      }, (err) => {
          //alert("Something went wrong");
      }
    );
      
  }
  
  backClick() { 
    this.router.navigate(['/'+this.parentModule], { queryParams: this.parentModuleParam });
  }

  // GET all get Audio
  GetAudios() {
    this.services.getAudioList(this.subjectId,localStorage.getItem(Constants.DATACONTENTTYPE)).subscribe((response) => {
     // console.log('=======response audiolist==================>', response.result);
      if (response.status = "ACTIVE") {

        for(var obj in response.result){
          //console.log(response.result[obj]);
          if(response.result[obj]._id == this.chapterId){
              if(response.result[obj].audioIds && response.result[obj].audioIds.length > 0)
                  this.currentAudio = response.result[obj];
          }
        }
      }
    });
  }

 // Get all Test list
  GetTestList() {
    this.services.getTestList(this.chapterId,localStorage.getItem(Constants.DATACONTENTTYPE)).subscribe(
      (response) => {
        if (response.responseCode == 200) {
          let testList = response.result;
          if(testList && testList.length > 0){
            this.currentTest = testList[0];
            console.log("this.currentTest",this.currentTest);
          }
        } 
      }, (err) => {
        //alert("Something went wrong");
      }
    );
  }

  getEBook(){
    
    this.services.getEBook(this.subjectId,localStorage.getItem(Constants.DATACONTENTTYPE)).subscribe(
      (response) => {
        console.log('=======response getEBook==================>', response.result);

        if (response.responseCode == 200) {
            response.result.forEach(async (chapter : any, index : number) => {
               if(chapter.bookIds && chapter.bookIds.length > 0){
                  if(chapter._id == this.chapterId){
                    this.currentEBook = chapter;                    
                  }
               }
            });
        } 
      }, (err) => {
        //alert("Something went wrong");
      }
    );
  }

  viewPdf(filePath : string) {
    window.open(encodeURI(filePath), "_system", "location=yes");
  }

  // GET all GetAllPdfs
  GetAllPdfs() {
    this.services.getChapterList(this.subjectId,localStorage.getItem(Constants.DATACONTENTTYPE)).subscribe((response) => {
      console.log('=======GetAllPdfs==================>', response.result);
      if (response.status = "ACTIVE") {
	      response.result.forEach(async (chapter : any, index : number) => {
           if(chapter.notesIds && chapter.notesIds.length > 0){
              if(chapter._id == this.chapterId){
                this.currentPDf = chapter;               
              }
           }
        });
      }
    });
  }

  PlayNextVideo() {
  
    this.videoIndex = this.videoIndex + 1;
    this.loadVideo();
  }

  loadVideoByIndex(iIndex : number) {
  
    if(this.videoIndex == iIndex){

    }else{
      this.videoIndex = iIndex;
      this.loadVideo();  
    }
  }

  loadVideo(){


    // const myVideo = <HTMLVideoElement>document.getElementById('videoPlayer');
    // myVideo.pause();

    // this.onPause();

    // if(this.currentAudio && this.currentAudio.isPlaying){
    //   this.currentAudio.isPlaying = false;
    //   this.togglePlayer(true);
    // }


    localStorage.setItem('videoIndex', this.videoIndex+"");
    this.videoId = this.videoList[this.videoIndex]._id;
    this.videoUrl = this.videoList[this.videoIndex].cloudFlareVideoId ? this.videoList[this.videoIndex].cloudFlareVideoId : this.videoList[this.videoIndex].url;
    this.videoType =  this.videoList[this.videoIndex].cloudFlareVideoId ? "CLOUDFLARE" : "SERVERURL";
    this.videoTitle = this.videoList[this.videoIndex].title;
    //this.chapterId = this.videoList[this.videoIndex].chapterId;
    //this.chapterName = this.videoList[this.videoIndex].chapterName;
    //this.subjectName = this.videoList[this.videoIndex].subjectName;
    //this.subjectId = this.videoList[this.videoIndex].subjectId;
    this.description = this.videoList[this.videoIndex].description;


    this.interactiveVideoModule = false;
    this.interactiveVideoModuleTestId = "";
    if(this.videoList[this.videoIndex].testIds && this.videoList[this.videoIndex].testIds.length){
        if(this.videoList[this.videoIndex].testIds.length > 0){
          this.interactiveVideoModuleTestId = this.videoList[this.videoIndex].testIds[0];
          this.interactiveVideoModule = true;
        }
    }

    // this.videoList = JSON.parse(this.videoList[this.videoIndex].videoList);

    if (this.videoIndex == (this.videoList.length - 1)) {
      console.log("Last Video");
      this.isNextVideoAvailable = false;
    } else {
      this.isNextVideoAvailable = true;
    }

    //play video code

    this.getVideoRelatedData();
  }


  getVideoRelatedData(){
    this.getVideoHistory(this.videoId);
    this.getLikeVideoInfo(this.videoId);
    this.getbookmarkedhistoryInfo(this.videoId);
    this.saveVideoStudentProgressReport();
    this.getContentMappingByVideoId(this.videoId);
  }

  getVideoHistory(videoId: string) {
    this.services.getVideoHistory(videoId).subscribe(
      (response) => {
        console.log('response getVideoHistory ', response);
        if (response.responseCode === 200) {
          let myVideo: any = <HTMLVideoElement>document.getElementById('videoPlayer');
          if(response.result.duration == response.result.totalDuration){
            
          }else{
            if(this.videoType == "CLOUDFLARE"){
              this.currentTime = response.result.duration;
            }else{
               //MKN
              //myVideo.currentTime = +response.result.duration;
            }
           
            
          }
        }
      },
      (error) => {

      }
    );
  }

  getbookmarkedhistoryInfo(videoId: string) {

    this.services.getbookmarkedhistoryInfo(videoId).subscribe(
      (response) => {
          console.log('response getbookmarkedhistoryInfo ', response);
          if (response.responseCode === 200) {
              this.isBookmarkVideoLiked = true;
              this.bookmark_id = response.result._id;
          }else{
              this.isBookmarkVideoLiked = false;
          }
      },
      (error) => {

      }
    );
  }

  async bookmarkvideo(){

    if(this.isBookmarkVideoLiked){
      
      let obj = {
        bookmark_id : this.bookmark_id
      }
      this.service.deleteBookmarkedhistory(obj).subscribe((resp) => {
        console.log('==deleteBookmarkedhistory=========>', resp);
        this.bookmark_id = "";
        this.isBookmarkVideoLiked = false;
        this.presentToast(this.disbookmarksuccessmessage);
      });

    }else{
        const body = {
          subjectId: this.subjectId,
          videoId: this.videoId,
          contentType : localStorage.getItem(Constants.DATACONTENTTYPE)
        };

        await this.services.saveBookmarkedhistory(body).subscribe(
          (response) => {
            console.log('response Post ', response);
            if (response.status = "ACTIVE") {
              this.isBookmarkVideoLiked = true;
              this.bookmark_id = response.result._id;
              this.presentToast(this.bookmarksuccessmessage);
            }
          },
          (error) => {

          }
        );
    }

  }

  presentToast(iMessage : string){
    alert(iMessage);
  }

  async postVideoHistory(duration: number, totalDuration: number) {
    if(totalDuration == null){
        return;
    }

    const body = {
      duration: duration,
      totalDuration: totalDuration,
      subjectId: this.subjectId,
      videoId: this.videoId,
      contentType : localStorage.getItem(Constants.DATACONTENTTYPE),

    };

    await this.services.postVideoHistory(body).subscribe(
      (response) => {
        console.log('response Post ', response);
        if (response.status = "ACTIVE") {

        }
      },
      (error) => {

      }
    );
  }


  getLikeVideoInfo(videoId: string) {

    this.services.getLikedVideoInfo(videoId).subscribe(
      (response) => {
          console.log('response getLikeVideoInfo ', response);
          if (response.responseCode === 200) {
              this.isVideoLiked = response.result.likeVideo == 1 ? true : false;
              this.videolikeid = response.result._id;
              this.videorating = response.result.rating ? response.result.rating : 0;
              this.lastvideorating = response.result.rating ? response.result.rating : 0;
          }else{
              this.isVideoLiked = false;
          }
      },
      (error) => {

      }
    );

  }


  fechChapters(){
    this.services.getChapterList(this.subjectId,localStorage.getItem(Constants.DATACONTENTTYPE)).subscribe((response) => {
      console.log('===fechChapters====getChapterList=============>', response);
      if (response.status = "ACTIVE") {
        if(response.result){

          let chapters : any = [];
          response.result.forEach((element : any) => {
              if(element.videoId && element.videoId.length > 0){
                element.videoId.sort(function (a: any, b: any) {
                  return a.videoNumber - b.videoNumber;
                });
                chapters.push(element);
              }
          });

          console.log(chapters);

          if(chapters.length > 0){
            for(let i = 0 ; i < chapters.length ; i++){
              if(chapters[i]._id  == this.chapterId){
                  let nextChapter = chapters[i+1] ? chapters[i+1] : null;
                  console.log(nextChapter);
                  if(nextChapter){
                    this.showNextChapterLoadAlert(nextChapter);
                  }else{
                     console.log("No chapter left");
                  }
                  break;
              }
            }            
          }
        }
      }
    });
  }

  async showNextChapterLoadAlert(iNextChapter: any) {
    
  
    // const alert = await this.alertController.create({
    //   message: this.lastvideoendsmessage,
    //   buttons: [
    //     {
    //       text: this.lastvideoendsmessagecontinue,
    //       role: 'cancel',
    //       handler: () => {
    //         console.log('Cancel clicked');

    //       }
    //     },
    //     {
    //       text: this.lastvideoendsmessagenextchapter,
    //       handler: () => {
    //         //console.log('Buy clicked');
           
    //         let videoObject = iNextChapter.videoId[0];
                 
    //         localStorage.setItem('playnext', 'false');
    //         localStorage.setItem('videoIndex', 0+"");


    //         let interactiveVideoModule = false;
    //         let interactiveVideoModuleTestId = "";
    //         if(iNextChapter.testIds && iNextChapter.testIds.length){
    //             if(iNextChapter.testIds.length > 0){
    //               interactiveVideoModuleTestId = iNextChapter.testIds[0];
    //               interactiveVideoModule = true;
    //             }
    //         }
            
    //         let params = { 
    //           chapterId: iNextChapter._id,
    //           chapterName: iNextChapter.title,
    //           description: videoObject.description || "",
    //           videoId : videoObject._id,
    //           subjectId:  this.subjectId,
    //           subjectName: this.subjectName,
    //           title: videoObject.title,
    //           vedioUrl: videoObject.cloudFlareVideoId ? videoObject.cloudFlareVideoId : videoObject.url,
    //           videoType: videoObject.cloudFlareVideoId ? "CLOUDFLARE" : "SERVERURL",
    //           videoIndex: 0,
    //           parentModule : "subject", 
    //           parentModuleParam :  JSON.stringify({ subjectId: this.subjectId, subjectName: this.subjectName }),
    //           interactiveVideoModuleTestId : interactiveVideoModuleTestId,
    //           interactiveVideoModule : interactiveVideoModule,
    //         }


    //         this.router.navigate(['/videosample'], { 
    //           replaceUrl:true,
    //           queryParams: params
    //         });
            
            
            
    //       }
    //     }
    //   ]
    // });
    // alert.present();
  }

  onDurationChange(a: any){
    console.log(a)
  }
  
  onVideoEnded(event : any) {
    // alert('it is worked');
    this.VideoQuizTakeATest();
  }
  
  onLoadedData(event : any){
    console.log(event);
  }

  onLoadStart(event : any){
    console.log(event);
    this.videoLoaded = true;
  }

  onPlayVideo(event : any){
    // if(this.currentAudio && this.currentAudio.isPlaying){
    //   this.currentAudio.isPlaying = false;
    //   this.togglePlayer(true);
    // }
  }

  onPause() {
    console.log('paused')
    // let myVideo: any = <HTMLVideoElement>document.getElementById('videoPlayer');
    // console.log('currentTime', myVideo.currentTime)
    // console.log('duration', myVideo.duration)
    // const duration = Math.round(myVideo.duration);
    // const currentTime = Math.round(myVideo.currentTime);
    // this.postVideoHistory(currentTime, duration);
  }

  VideoQuizTakeATest() {
    
    if(this.interactiveVideoModule){
      if (this.interactiveVideoModuleTestId && this.interactiveVideoModuleTestId != "") {

        // const myVideo = <HTMLVideoElement>document.getElementById('videoPlayer');
        // myVideo.pause();

        // this.onPause();

          const query = {
            queryParams: {
              subjectId   : this.subjectId,
              subjectName : this.subjectName,
              chapterId   : this.chapterId,
              testId      : this.interactiveVideoModuleTestId,
              videoIndex  : this.videoIndex,
              parentModule : "/mdm-home/video-details", 
              parentModuleParam :  JSON.stringify(this.PassedParams),
            }
          };
          localStorage.setItem('fromVideo', 'true');
          this.router.navigate(['/mdm-home/question'], query);
      }
    }else{
      if(this.videoIndex == (this.videoList.length - 1)) {
        console.log("Last Video");
        this.fechChapters();
      } else {
        this.PlayNextVideo();
        
        
      }
    } 
  }

  DownloadSwadhya(){
    if(this.currentPDf){
      this.viewPdf(this.currentPDf.notesIds[0].file)
    }
  }

  DownloadEBook(){
    if(this.currentEBook){
      this.viewPdf(this.currentEBook.bookIds[0].file)
    }
  }

  playAudioLesson(){
    // if(this.currentAudio){
    //   this.start(this.currentAudio);
    // }
  }

  TakeATest(){

    this.onPause();
    
    // if(this.currentAudio && this.currentAudio.isPlaying){
    //   this.currentAudio.isPlaying = false;
    //   this.togglePlayer(true);
    // }

    if(this.currentTest){
      const query = {
        queryParams: {
          subjectId: this.subjectId,
          subjectName: this.subjectName,
          chapterId: this.chapterId,
          testId: this.currentTest._id,
          parentModule : "videosample", 
          parentModuleParam :  JSON.stringify(this.PassedParams),
        }
      };
      localStorage.setItem('fromVideo', 'false');
      this.router.navigate(['/question'], query);
    }
  }
  
  getContentMappingByVideoId(videoId : string){

    this.videoMappingList = [];
    this.services.getContentMappingByVideoId(videoId).subscribe(
      (response) => {
          console.log('=======response========getContentMappingByVideoId==========>', response);

          if (response.responseCode == 200) {
            if(response.result && response.result.length > 0){
              let mappings = response.result[0].mappings;
             
              for(let i = 0 ; i < mappings.length ;i++) {
                if(mappings[i].videoId._id != videoId){
                  mappings[i].videoId.mediumId = mappings[i].mediumId
                  this.videoMappingList.push(mappings[i].videoId);
                }
              }
            }
          }
        
      }, (err) => {
          //alert("Something went wrong");
      }
    );
  }

  playOtherMediumVideo(iVideo : any){
    console.log(iVideo);

    if(this.videoType == "CLOUDFLARE"){

    }else{
      setTimeout(()=>{   
       
        //play video code
        
   
       },1000)
    }
    this.getContentMappingByVideoId(iVideo._id);

  }

  saveVideoStudentProgressReport(){
    const body = {
      subjectId: this.subjectId,
      chapterId : this.chapterId,
      gradeId : localStorage.getItem(Constants.GRADEID),
      mediumId : localStorage.getItem(Constants.MEDIUMID),
      contentType : localStorage.getItem(Constants.DATACONTENTTYPE),
      videoId: this.videoId
    };

    this.services.saveStudentProgress(body).subscribe(
      (response) => {
        console.log('response saveVideoStudentProgressReport ', response);
        if (response.status = "ACTIVE") {
         
        }
      },
      (error) => {

      }
    );
  }

  saveAudioStudentProgressReport(){
    const body = {
      subjectId: this.subjectId,
      chapterId : this.chapterId,
      gradeId : localStorage.getItem(Constants.GRADEID),
      mediumId : localStorage.getItem(Constants.MEDIUMID),
      contentType : localStorage.getItem(Constants.DATACONTENTTYPE),
      audioId: this.currentAudio.audioIds[0]._id
    };

    this.services.saveStudentProgress(body).subscribe(
      (response) => {
        console.log('response saveAudioStudentProgressReport ', response);
        if (response.status = "ACTIVE") {
         
        }
      },
      (error) => {

      }
    );
  }

  saveEBookStudentProgressReport(){
    const body = {
      subjectId: this.subjectId,
      chapterId : this.chapterId,
      gradeId : localStorage.getItem(Constants.GRADEID),
      mediumId : localStorage.getItem(Constants.MEDIUMID),
      contentType : localStorage.getItem(Constants.DATACONTENTTYPE),
      ebookId: this.currentEBook.bookIds[0]._id 
    };

    this.services.saveStudentProgress(body).subscribe(
      (response) => {
        console.log('response saveEBookStudentProgressReport ', response);
        if (response.status = "ACTIVE") {
         
        }
      },
      (error) => {

      }
    );
  }

  saveNotesStudentProgressReport(){
    const body = {
      subjectId: this.subjectId,
      chapterId : this.chapterId,
      gradeId : localStorage.getItem(Constants.GRADEID),
      mediumId : localStorage.getItem(Constants.MEDIUMID),
      contentType : localStorage.getItem(Constants.DATACONTENTTYPE),
      nodeId: this.currentPDf.notesIds[0]._id,

    };

    this.services.saveStudentProgress(body).subscribe(
      (response) => {
        console.log('response saveNotesStudentProgressReport ', response);
        if (response.status = "ACTIVE") {
         
        }
      },
      (error) => {

      }
    );
  }

  saveStudentActivity(iProgressdetails : any){
    const body = {
      ...iProgressdetails,
      subjectId: this.subjectId,
      chapterId : this.chapterId,
      gradeId : localStorage.getItem(Constants.GRADEID),
      mediumId : localStorage.getItem(Constants.MEDIUMID),
      contentType : localStorage.getItem(Constants.DATACONTENTTYPE),
    };

    this.services.saveStudentHistory(body).subscribe(
      (response) => {
        console.log('response saveStudentActivity ', response);
        if (response.status = "ACTIVE") {
         
        }
      },
      (error) => {

      }
    );
  }

}
