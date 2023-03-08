import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HTTP_INTERCEPTORS,HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { Constants } from "../_services/constants.enum";
import { StorageService } from "../_services/storage.service";
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';


@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    static HEADER_VALUE = 'application/json'
    constructor(private storageService: StorageService,private router: Router) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        console.log("Actual AuthInterceptor fired.")
        const jwtToken = this.storageService.retrieve(Constants.token);

        if (jwtToken != null) {
            request = request.clone({ headers: request.headers.set(Constants.token, jwtToken) });
        }

        if (!request.headers.has(Constants.CONTENT_TYPE)) {
            request = request.clone({ headers: request.headers.set(Constants.CONTENT_TYPE, AuthInterceptor.HEADER_VALUE) });
        }

        if (!request.headers.has(Constants.ACCEPT)) {
            request = request.clone({ headers: request.headers.set(Constants.ACCEPT, 'application/json') });
        }
        return next.handle(request).pipe(
            map((event: HttpEvent<any>) => {
               
                if (event instanceof HttpResponse) {
                    
                    if(event && event.body && event.body.responseCode && event.body.responseCode == 401){
                        this.storageService.removeStorage();
                        alert("Session expired.");
                        this.router.navigate(['/login']);
                    }
                }
                return event;
            }));
    }

}

export const authInterceptorProviders = {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true,
};
