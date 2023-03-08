import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment as env } from '../../../environments/environment'
@Injectable({
  providedIn: 'root'
})
export class RestService {

  constructor(private httpClient: HttpClient) { }
  /**
  * Performs a request with `post` http method.
  */
  post(url: string, body: any): Observable<any> {
    console.log("Actual api call")
    return this.httpClient.post<any>(`${env.api}${url}`, body);
  }
  /**
   * Performs a request with `get` http method.
   */
  get(url: string): Observable<any> {
    return this.httpClient.get<any>(`${env.api}${url}`);
  }
  /**
   * Performs a request with `delete` http method.
   */
  delete(url: string, id: any): Observable<any> {
    return this.httpClient.delete<any>(`${env.api}${url}/${id}`);
  }
  /** 
   * Performs a request with `put` http method.
   */
  put(url: string, body: any): Observable<any> {
    return this.httpClient.put<any>(`${env.api}${url}`, body);
  }


}
