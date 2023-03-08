import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RedirectGuard } from '../core/_helper/redirect.guard';
import { MdmMainComponent } from "./mdm-main.component";

import { HomeComponent } from './component/home/home.component';
import { SubjectChapterComponent } from './component/subject-chapter/subject-chapter.component';
import { VideoDetailsComponent } from './component/video-details/video-details.component';
import { CaseStudyComponent } from './component/case-study/case-study.component';
import { ExploreComponent } from './component/explore/explore.component';
import { PdfViewerComponent } from './component/pdf-viewer/pdf-viewer.component';
import { VideoViewerComponent } from './component/video-viewer/video-viewer.component';


const routes: Routes = [
  {
    path: "",
    component: MdmMainComponent,
    children: [
      {
        path: "",
        redirectTo: "home",
      },
      {
        path: "home",
        component: HomeComponent,
      },{
        path: "subject-chapter",
        component: SubjectChapterComponent,
      },{
        path: "video-details",
        component: VideoDetailsComponent,
      }, {
        path: "case-study",
        component: CaseStudyComponent,
      }, {
        path: "explore",
        component: ExploreComponent,
      },
      {
        path: "pdf-viewer",
        component: PdfViewerComponent,
      }
      ,
      {
        path: "video-viewer",
        component: VideoViewerComponent,
      }
      // {
      //   path: "search",
      //   component: HomeUserContentComponent,
      // },
      // {
      //   path: "upgrade",
      //   component: AdminDashboardComponent,
      // },
      // {
      //   path: "Profile",
      //   component: AdminDashboardComponent,
      // }
    ],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MdmMainRoutingModule { 
}
