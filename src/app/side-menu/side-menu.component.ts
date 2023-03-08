import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LanguageService } from '../language.service';
import { StorageService } from '../core/_services/storage.service';
import { ShareableService } from '../core/_services/shareable.service';
import { Router,ActivatedRoute,NavigationStart } from '@angular/router';
import { Constants } from '../core/_services/constants.enum';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.css']
})
export class SideMenuComponent implements OnInit {

  moduleselected : string = 'home';
  applanguage : string;
  IsAccessBlocked : boolean = false;
  public mediumName : string;
  
  constructor(private shareableService: ShareableService,private router: Router,public translate: TranslateService,private localStorageAPI: StorageService, private languageservice: LanguageService) {
    this.languageservice.retriveLanguage().subscribe((response) => {
      this.applanguage = response;
    });
  }

  
  
  ngOnInit() {

    this.mediumName = this.localStorageAPI.retrieve(Constants.MEDIUMNAME) || "";
    // this.IsAccessBlocked = this.mediumName == 'English' ? true : false;
    // if(!this.IsAccessBlocked)
    //   this.checkFreeAccessEnded();

    let moduleselected = this.localStorageAPI.retrieve(Constants.moduleSelected) || 'home';
    if(moduleselected && moduleselected != ""){
      this.moduleselected = moduleselected;
    }

    this.router.events.subscribe(event =>{
      if (event instanceof NavigationStart){
        console.log(event.url)
        console.log("-----TabsPageTabsPageTabsPageTabsPageTabsPageTabsPageTabsPageTabsPageTabsPageTabsPage----------- "+event.url)

        switch(event.url){                                                                                                                                                                                    
            case "/home/tabs/profile" : this.moduleselected = 'profile'; break;
            case "/home/tabs/explore" : this.moduleselected = 'explore'; break;
            case "/home/tabs/case-study" : this.moduleselected = 'casestudy'; break;
            case "/home/tabs/search" : this.moduleselected = 'search'; break;
            case "/home/tabs/home" : 
            case "/home" : this.moduleselected = 'home'; break;
        }


      }
    })    

    this.shareableService.licenceRenewal.subscribe(data => {
      console.log("----licenceRenewal-----");
      console.log(data);
      if(data == "ACTIVE"){
        this.IsAccessBlocked = false;
      }

      if(data == "BLOCK"){
        this.IsAccessBlocked = true;
      }
      // decoded
    });
  }

  ngAfterViewInit() {
    this.mediumName = this.localStorageAPI.retrieve(Constants.MEDIUMNAME) || "";
    // this.IsAccessBlocked = this.mediumName == 'English' ? true : false;
    // if(!this.IsAccessBlocked)
    //   this.checkFreeAccessEnded();
    
    // let gradeName = Number(this.localStorageAPI.retrieve(Constants.GRADEORDER))
    // if(gradeName == 13){
    //   this.IsAccessBlocked = true;
    // }
    

  }

  checkFreeAccessEnded(){
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
      }else{
        subscriptionmodelload = true;
      }
    }else if(this.localStorageAPI.retrieve(Constants.SUBSCRIPTIONCODECODE) == "0"){
      subscriptionmodelload = false;
    }else{
    
      let startdate = new Date(this.localStorageAPI.retrieve(Constants.SUBSCRIPTIONCODEVALIDFROM) || "");
      let enddate = new Date(this.localStorageAPI.retrieve(Constants.SUBSCRIPTIONCODEVALIDTO) || "");
      let currentDate = new Date();
      if(currentDate.getTime() > enddate.getTime()){
        subscriptionmodelload = true;
      }else{
        subscriptionmodelload = false;
      }
    }

    // if(subscriptionmodelload){
    //   this.IsAccessBlocked = true;
    // }
  }

  moduleClick(iModule : string){
      if(iModule == 'logout'){
        this.localStorageAPI.removeStorage();
        this.router.navigate(['/login']);  
        return;
      }

      this.moduleselected = iModule;
      this.localStorageAPI.store(Constants.moduleSelected,iModule);

      if(iModule == 'profile'){
        this.shareableService.profileDrawer.next("OPEN");
      }

      if(iModule == 'explore'){
        this.router.navigate(['/mdm-home/explore']);  
      }

      if(iModule == 'home'){
        this.router.navigate(['/mdm-home/home']);  
      }

      if(iModule == 'casestudy'){
        this.router.navigate(['/mdm-home/case-study']);  
      }
  }

}
