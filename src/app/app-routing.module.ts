import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './core/_helper/auth.guard';
import { RedirectGuard } from './core/_helper/redirect.guard';

import { UserOnboardingComponent } from './user-onboarding/user-onboarding.component';
import { LoginComponent } from './login/login.component';
import { UserSigninComponent } from './user-signin/user-signin.component';
import { MdmMainComponent } from './mdm-main/mdm-main.component';
import { MdmFeatureComponent } from './mdm-feature/mdm-feature.component';


const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'user-boarding', component: UserOnboardingComponent,canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent ,canActivate: [AuthGuard] },
  { path: 'user-sigin', component: UserSigninComponent ,canActivate: [AuthGuard] },
  { 
    path: 'mdm-home', 
    canActivate: [RedirectGuard],
    loadChildren: () => import('./mdm-main/mdm-main.module').then( m => m.MdmMainModule)
  },
  { path: 'mdm-course', component: MdmFeatureComponent,canActivate: [RedirectGuard] },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
