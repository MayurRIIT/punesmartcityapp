import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Constants } from '../_services/constants.enum';
import { StorageService } from '../_services/storage.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private storageService: StorageService, private router: Router) {
   
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    const jwtToken = this.storageService.retrieve(Constants.token);
    console.log(jwtToken)
    //check jwtToken exist or not.  
    if (jwtToken != null) {
      this.router.navigate(["mdm-home/home"]);
      return false;
    }
    //You are not allowed to view this page.
    //redirect to login/home page etc
    //return false to cancel the navigation
    return true;
  }

}
