import { Injectable } from '@angular/core';
import { HttpHeaders, HttpRequest, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

import { HttpClientService } from './http-client.service';
import { User } from '../model/user.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private options: any = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      observe: 'response'
    }),
    withCredentials: true
  };

  constructor(
    private httpClient: HttpClientService
  ) { }

  public signUp(user: User): Promise<any> {
    const path = environment.url_api_sign_up;
    const httpRequest = new HttpRequest('POST', path, user, this.options);
    return this.httpClient.request<any>(httpRequest);
  }

  public login(user: User): Promise<any> {
    const path = environment.url_api_login;
    const httpRequest = new HttpRequest('POST', path, user, this.options);
    return this.httpClient.request<any>(httpRequest);
  }

  public logout(user: User): Promise<any> {
    const path = environment.url_api_logout;
    const httpRequest = new HttpRequest('POST', path, user, this.options);
    return this.httpClient.request<any>(httpRequest);
  }

}
