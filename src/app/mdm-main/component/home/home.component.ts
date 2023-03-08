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
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {


  private ngxRouter: Router;
  private service: APIService;
  name: any;
  profilePic: any;
  ClassGrade: any;
  bannerImages: any = [];
  watchedHistory: any = [];
  subjects: any = [];
  private userType : string;
  private gradeNumber : number;
  private contentType : string;
  private oldContentType : string;
  private onlineLectureRequired: boolean = false;  
  private notificationCount : number =  0;
  private gradesData : any = [];
  private gradeId : any;
  private oldgradeId : any;

  drawerType : string ;

  private timerStart : any = false;

  openDrawerFlag : any = false;
  swadhyayArr: any = [
    { type : "takeatest",  name:'Take a test',bg:'',description:'PDF for self-learning and assessment',color:'#3cd83c'},
    { type : "swadhyay", name:'Swadhyay (PDF)',bg:'assets/images/bg.svg',description:'PDF for self-learning and assessment',color:'#5d5dce'},
    { type : "audio", name:'Audio Lesson',bg:'assets/images/bgTwo.svg',description:'Listen to audio lesson on the go',color:'#f17070'},
  ];

 
  constructor(private shareableService: ShareableService,private translate: TranslateService,private languageservice: LanguageService,private services: APIService,private router: Router,private localStorageAPI: StorageService, public activeRoute: ActivatedRoute) { 

    this.service = services;
    this.ngxRouter = router;
    
  }

  ngOnInit(): void {

    this.activeRoute.params.subscribe(val => {
      // Handle param values here
      console.log("-------activeRoute--------------");
      this.gradeNumber = Number(this.localStorageAPI.retrieve(Constants.GRADEORDER));
      this.userType = this.localStorageAPI.retrieve(Constants.USERTYPE) || "STUDENT";
      this.contentType = this.localStorageAPI.retrieve(Constants.DATACONTENTTYPE) || "REVISION";
      this.oldContentType = this.localStorageAPI.retrieve(Constants.DATACONTENTTYPE) || "REVISION";
      
      let schoolVerified = this.localStorageAPI.retrieve(Constants.SCHOOLVERIFIED);
      if(schoolVerified == 'undefined' || schoolVerified == 'null' || schoolVerified == "false"){
        this.onlineLectureRequired = false;
      }else{
        this.onlineLectureRequired = true;
      }

      this.loadProfileData();
      //this.showNotificationCount();
    });

  }

  loadProfileData(){
     // this.getWatchedHistory();
     // this.getProfileDetails();

      this.gradeId = this.localStorageAPI.retrieve(Constants.GRADEID);
      this.oldgradeId = this.localStorageAPI.retrieve(Constants.GRADEID);
      this.name = this.localStorageAPI.retrieve(Constants.FIRST_NAME);// + " " + resp.result.lastName;
      this.profilePic = this.localStorageAPI.retrieve(Constants.PHOTO);
      this.ClassGrade = this.localStorageAPI.retrieve(Constants.GRADEID);
      this.languageservice.retriveLanguage().subscribe((response) => {
        let language = response;
        if(language == 'mr'){
          this.ClassGrade = ordinal_suffix_of_mar(Number(this.localStorageAPI.retrieve(Constants.GRADEORDER)));
        }else{
          this.ClassGrade = ordinal_suffix_of_eng(Number(this.localStorageAPI.retrieve(Constants.GRADEORDER)));
        }
      });

      this.getSubjectList();
  }


  showNotificationCount(){
    let count = this.localStorageAPI.retrieve(Constants.NOTIFICATIONCOUNT);
    if(!count){
      count = "0";
    }
    this.notificationCount = Number(count);

  }


  getProfileDetails() {

    this.service.myProfile().subscribe((resp) => {
      if (resp.responseCode == 200) {
        console.log("----------getProfileDetails----------------------",resp);
	      this.localStorageAPI.store(Constants.GRADE,resp.result.gradeId.gradeName);
        this.localStorageAPI.store(Constants.GRADEORDER,resp.result.gradeId.order);
        this.localStorageAPI.store(Constants.MEDIUMID,resp.result.mediumId._id);
        this.localStorageAPI.store(Constants.GRADEID,resp.result.gradeId._id);
        this.localStorageAPI.store(Constants.PHOTO,resp.result.profilePic);
        this.localStorageAPI.store(Constants.EMAIL,resp.result.email);
        this.localStorageAPI.store(Constants.CITY, resp.result.city);
        this.localStorageAPI.store(Constants.PINCODE, resp.result.pincode);

        if(resp.result.userCouponData && resp.result.userCouponData.length > 0){
          this.localStorageAPI.store(Constants.SUBSCRIPTIONCODEVALIDFROM, resp.result.userCouponData.SubscriptionCodeValidFrom);
          this.localStorageAPI.store(Constants.SUBSCRIPTIONCODEVALIDTO, resp.result.userCouponData.SubscriptionCodeValidTo);
        }

        if(this.localStorageAPI.retrieve(Constants.SUBSCRIPTIONCODEISUSED)){
          let currentDate = new Date(resp.result.currentDate);
          this.checkSubScriptionApply(currentDate);
        }
       // this.localStorageAPI.store(Constants.ZOOMEMAIL,resp.result.zoomEmail);

        if(resp.result.gradesData)
          this.gradesData = resp.result.gradesData;
        this.gradeId = resp.result.gradeId._id;
        this.oldgradeId = resp.result.gradeId._id;

        this.bannerImages = [];
        

        // if(resp.result.sponsorId && resp.result.sponsorId.flashScreenUrl && (resp.result.sponsorId.displayType == "FlashScreen" || resp.result.sponsorId.displayType == "Both")){
        //   this.localStorageAPI.store(Constants.SplashImage, resp.result.sponsorId.flashScreenUrl);
        // }

        if(resp.result.sponsorId){
            let  startDate = new Date(resp.result.sponsorId.startDate);
            let  endDate = new Date(resp.result.sponsorId.endDate);
            let currentDate = new Date(resp.result.currentDate);

            if(currentDate.getTime() >= startDate.getTime() && endDate.getTime() >= currentDate.getTime()){
              
              if(resp.result.sponsorId && resp.result.sponsorId.displayTarget == "FIXED" && (resp.result.sponsorId.displayType == "DashboardBanner" || resp.result.sponsorId.displayType == "Both")){
                if(Array.isArray(resp.result.sponsorId.multipleBannerFileUrl)){
                  if(resp.result.sponsorId.multipleBannerFileUrl && resp.result.sponsorId.multipleBannerFileUrl.length > 0){
                    //this.bannerImages = [ ...this.bannerImages, ...resp.result.sponsorId.multipleBannerFileUrl ]
                    resp.result.sponsorId.multipleBannerFileUrl.forEach((image : any) => {
                      this.bannerImages.push({ path : image });
                    });
                  }
                }
              }
              
              if((resp.result.sponsorId.flashScreenUrl || resp.result.sponsorId.videoFileUrl) && (resp.result.sponsorId.displayType == "FlashScreen" || resp.result.sponsorId.displayType == "Both")){
                if(resp.result.sponsorId.flashScreenUrl){
                  this.localStorageAPI.clearStorage(Constants.SplashVideo);
                  this.localStorageAPI.store(Constants.SplashImage, resp.result.sponsorId.flashScreenUrl);
                }else if(resp.result.sponsorId.videoFileUrl){
                  this.localStorageAPI.clearStorage(Constants.SplashImage);
                  this.localStorageAPI.store(Constants.SplashVideo, resp.result.sponsorId.videoFileUrl);
                }
              }else{
                this.localStorageAPI.clearStorage(Constants.SplashImage);
                this.localStorageAPI.clearStorage(Constants.SplashVideo);
              }
            }else{
              this.localStorageAPI.clearStorage(Constants.SplashImage);
              this.localStorageAPI.clearStorage(Constants.SplashVideo);
            }

        }

        this.getBannerData();

        

        this.name = resp.result.firstName;// + " " + resp.result.lastName;
        this.profilePic = resp.result.profilePic;
        this.ClassGrade = resp.result.gradeId.gradeName;
        this.languageservice.retriveLanguage().subscribe((response) => {
          let language = response;
          if(language == 'mr'){
            this.ClassGrade = ordinal_suffix_of_mar(Number(this.localStorageAPI.retrieve(Constants.GRADEORDER)));
          }else{
            this.ClassGrade = ordinal_suffix_of_eng(Number(this.localStorageAPI.retrieve(Constants.GRADEORDER)));
          }
        });

        //this.calculateProfileCompletion(resp.result);
      } else {

      }
    }, (err) => {
      console.log(err);
    });
  }

  //GET all Get Watched History
  getWatchedHistory() {
    this.watchedHistory = [];
    this.services.getLast2WatchedHistory(localStorage.getItem(Constants.DATACONTENTTYPE)).subscribe((response) => {
      console.log('=======response========getLast2WatchedHistory==========>', response);
      if (response.status = "ACTIVE") {
        response.result.forEach((element : any) => {
          element.percentage = Math.floor((element.duration / element.totalDuration) * 100);
        });
        this.watchedHistory = response.result;
      }
    });

  }



  //GET all Get Watched History
  getBannerData() {
    console.log('=============getBannerData==========>');
    
    this.services.getBannerData().subscribe((response) => {
      console.log('=======response========getBannerData==========>', response);
      if (response.status = "ACTIVE") {
        if(response.result && response.result.length > 0){
          response.result.forEach((element : any) => {
            if(Array.isArray(element.multipleBannerFileUrl)){
              if(element.multipleBannerFileUrl && element.multipleBannerFileUrl.length > 0){
                element.multipleBannerFileUrl.forEach((image : any) => {
                  this.bannerImages.push({ path : image });
                });
                //this.bannerImages = [ ...this.bannerImages, ...element.multipleBannerFileUrl ]
              }
            }
          });
        }
        //console.log(this.bannerImages);
      }
    });

  }

  checkSubScriptionApply(iCurrentDate : Date){

    console.log(this.localStorageAPI.retrieve(Constants.SUBSCRIPTIONCODEISUSED));
    if(this.localStorageAPI.retrieve(Constants.SUBSCRIPTIONCODEISUSED) == "USED"){
        // check date wise valid or not

        localStorage.setItem("timer-running","3"); 

        let startdate = new Date(this.localStorageAPI.retrieve(Constants.SUBSCRIPTIONCODEVALIDFROM) || "");
        let enddate = new Date(this.localStorageAPI.retrieve(Constants.SUBSCRIPTIONCODEVALIDTO) || "");
        
        let currentDate = new Date();
        if(iCurrentDate){
          currentDate = new Date(iCurrentDate);
        }

        if(currentDate.getTime() > enddate.getTime()){
          this.shareableService.licenceRenewal.next("BLOCK");
          this.showModal();
        }else{

          if(this.localStorageAPI.retrieve(Constants.ADDRESSFORMSKIPCLICK) == "1"){

          }else if(this.localStorageAPI.retrieve(Constants.DISTRICT) == undefined || this.localStorageAPI.retrieve(Constants.DISTRICT) == 'undefined'){
            this.showModal();
          }

        }
    }else{
        
       let subscriptionmodelload = false;
       if(this.localStorageAPI.retrieve(Constants.SUBSCRIPTIONCODECODE) == "1" || this.localStorageAPI.retrieve(Constants.SUBSCRIPTIONCODECODE) == "2"){
          let startdate = new Date(this.localStorageAPI.retrieve(Constants.SUBSCRIPTIONCODEVALIDFROM) || "");
          let enddate = new Date(this.localStorageAPI.retrieve(Constants.SUBSCRIPTIONCODEVALIDTO) || "");
          //let enddate = new Date();
         // enddate.setMinutes(startdate.getMinutes()+1);
          console.log(startdate);
          console.log(enddate);
          let currentDate = new Date();
          if((currentDate.getTime() >= startdate.getTime()) && (currentDate.getTime() <= enddate.getTime())){
            subscriptionmodelload = false;
            this.timerStart = true;
          }else{
            this.timerStart = false;
            this.shareableService.licenceRenewal.next("BLOCK");
            subscriptionmodelload = true;
          }
          localStorage.setItem("timer-running","0"); 
       }else if(this.localStorageAPI.retrieve(Constants.SUBSCRIPTIONCODECODE) == "0"){
          subscriptionmodelload = true;
          localStorage.setItem("timer-running","0"); 
       }else{
          // full access subscription
          localStorage.setItem("timer-running","3"); 

          let startdate = new Date(this.localStorageAPI.retrieve(Constants.SUBSCRIPTIONCODEVALIDFROM) || "");
          let enddate = new Date(this.localStorageAPI.retrieve(Constants.SUBSCRIPTIONCODEVALIDTO) || "");
          let currentDate = new Date();
          if(currentDate.getTime() > enddate.getTime()){
            subscriptionmodelload = true;
            this.shareableService.licenceRenewal.next("BLOCK");
          }else{
            subscriptionmodelload = false;
          }
          
       }

       if(subscriptionmodelload){
           this.showModal();
       }

       
        
    }
  }

  async showModal() {  


    // const modal = await this.modalCtrl.create({  
    //   component: SubscriptionmodelPage,
    //   componentProps : {
    //     module : "HOME",
    //     close : false
    //   },
    //   backdropDismiss: false  
    // });  
    // modal.onDidDismiss().then((modelData) => {
    //   if (modelData !== null) {
    //     console.log('Modal Data : ' + modelData.data);
    //     switch(modelData.data){
    //       case "LOGOUT" :  this.timerStart = false; this.logout();   break;
    //       case "NO_TIMER" :   this.timerStart = false;  break;
    //       case "START_TIMER" :  this.timerStart = false; this.timerStart = true;  break;
    //       case "REOPEN" : this.showModal();  break;
    //       case "VIEWEXPLORE" : this.shareableService.licenceRenewal.next("BLOCK"); this.router.navigate(['/home/tabs/explore']);  break;
    //     }
    //   }
    // });
    // return await modal.present();  
  } 

  getInitials (string : String) {
    var names = string.split(' '),
        initials = names[0].substring(0, 1).toUpperCase();
    
    if (names.length > 1) {
        initials += names[names.length - 1].substring(0, 1).toUpperCase();
    }
    return initials;
  };

  getSubjectList() {

    let colorCodes = ['#FEA1BF','#D3756B','#E3ACF9','#4E6C50','#FFD56F','#FFD495','#FFBABA','#F2DEBA','#D09CFA','#BAD7E9','#FFCAC8','#F9B5D0','#FFDB89'];
    this.service.getSubjectList().subscribe((resp) => {
      console.log('==getSubjectList=========>', resp)

      if(resp && resp.length > 0){
        this.subjects = resp;
        for(let i = 0 ; i < this.subjects.length ; i++){
          this.subjects[i].altername = this.getInitials(this.subjects[i].name);
          this.subjects[i].colorCode = colorCodes[i];
        }
      }
    });
  }

  // getSubjectList() {

  //   this.service.getSubjectList().subscribe((resp) => {
  //     console.log('==getSubjectList=========>', resp)

  //     if (resp.responseCode == 200) {
  //       if(resp.result && resp.result.length > 0){
  //         resp.result.sort(function(a: any, b: any){
  //           return Number(a.subjectCode)-Number(b.subjectCode);
  //         })
         
         
  //         this.subjects = resp.result;
  //         console.log(this.subjects.length);
  //         // let subjectId = [];
  //         for(let i = 0 ; i < this.subjects.length ; i++){
  //           this.subjects[i].altername = this.subjects[i].name.split("and").join("\nand\n");
  //           //subjectId.push(this.subjects[i]._id);
  //         }
         
  //         this.getWatchedHistory();
  //         console.log('==this.subjects=========>', this.subjects)
  //       }       
  //     }
  //   });
  // }

  onSubjectClick(subject : any) {
    console.log('==onSubjectClick subject=========>', subject)
    this.localStorageAPI.store(Constants.SUBJECT_ID, subject.folLink);
    this.timerStart = false;
    this.router.navigate(['/mdm-home/subject-chapter'], { queryParams: { subjectLang: subject.lang, subjectId: subject.folLink, subjectName: subject.name } });
  }


  loadContinueReadingVideo(iVideo : any){
    console.log(iVideo);
    this.services.getVideoListByChapterId(iVideo.videoId.chapterId._id,localStorage.getItem(Constants.DATACONTENTTYPE)).subscribe(
      (response) => {
          console.log('=======response========getVideoListByChapterId==========>', response);

          if (response.responseCode == 200) {
            let videolist = response.result;
            console.log(videolist);
            if(videolist && videolist.length > 0){

              videolist.sort(function (a : any, b: any) {
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
                subjectId:  iVideo.subjectId._id,
                subjectName: iVideo.subjectId.name,
                title: iVideo.videoId.title,
                vedioUrl: iVideo.videoId.cloudFlareVideoId ? iVideo.videoId.cloudFlareVideoId : iVideo.videoId.url,
                videoType: iVideo.videoId.cloudFlareVideoId ? "CLOUDFLARE" : "SERVERURL",
                videoIndex: index,
                parentModule : "home/tabs/home", 
                parentModuleParam :  JSON.stringify({ }),
                interactiveVideoModule : false,
            }
            this.router.navigate(['/videosample'], { queryParams: _queryParams  });

              
              
            }
          } 
      }, (err) => {
          //alert("Something went wrong");
      }
    );  
  }
}
