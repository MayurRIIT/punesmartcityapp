import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { FirebasemessagingService } from 'src/app/core/_services/firebasemessaging.service';
import { environment } from "src/environments/environment";
import { AngularFireModule } from "@angular/fire/compat";
import { AngularFireMessagingModule } from '@angular/fire/compat/messaging';
import { CloudflareStreamModule } from "@cloudflare/stream-angular";
import {IvyCarouselModule} from 'angular-responsive-carousel';
import { AngMusicPlayerModule } from  'ang-music-player';


import { authInterceptorProviders } from './core/_helper/auth-interceptor';
import { APIService } from './core/_services/api.service';
import { ShareableService } from './core/_services/shareable.service';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserOnboardingComponent } from './user-onboarding/user-onboarding.component';
import { LoginComponent } from './login/login.component';
import { UserSigninComponent } from './user-signin/user-signin.component';
import { SideMenuComponent } from './side-menu/side-menu.component';
import { MdmFeatureComponent } from './mdm-feature/mdm-feature.component';
import { MdmMainComponent } from './mdm-main/mdm-main.component';



export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    UserOnboardingComponent,
    LoginComponent,
    UserSigninComponent,
    SideMenuComponent,
    MdmFeatureComponent,
    MdmMainComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    TranslateModule.forRoot({
      // defaultLanguage: 'mr',
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
    }),
    FormsModule,
    NgSelectModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireMessagingModule,
    CloudflareStreamModule,
    IvyCarouselModule,
    AngMusicPlayerModule
  ],
  providers: [
    FirebasemessagingService,
    authInterceptorProviders,
    APIService,
    ShareableService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
