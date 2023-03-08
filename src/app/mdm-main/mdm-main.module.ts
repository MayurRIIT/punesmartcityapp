import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { CloudflareStreamModule } from "@cloudflare/stream-angular";
import {IvyCarouselModule} from 'angular-responsive-carousel';
import { AngMusicPlayerModule } from  'ang-music-player';

import { MdmMainRoutingModule } from './mdm-main-routing.module';

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

import { HomeComponent } from './component/home/home.component';
import { SubjectChapterComponent } from './component/subject-chapter/subject-chapter.component';
import { VideoDetailsComponent } from './component/video-details/video-details.component';
import { CaseStudyComponent } from './component/case-study/case-study.component';
import { ExploreComponent } from './component/explore/explore.component';
import { PdfViewerComponent } from './component/pdf-viewer/pdf-viewer.component';
import { VideoViewerComponent } from './component/video-viewer/video-viewer.component';


@NgModule({
  declarations: [HomeComponent,SubjectChapterComponent,VideoDetailsComponent,CaseStudyComponent,ExploreComponent,PdfViewerComponent,VideoViewerComponent],
  imports: [
    CommonModule,
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
    MdmMainRoutingModule,
    CloudflareStreamModule,
    IvyCarouselModule,
    AngMusicPlayerModule
  ]
})
export class MdmMainModule { }
