import { Injectable } from '@angular/core';
import { HttpHeaders, HttpRequest, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { Observable, of, Subject, BehaviorSubject } from 'rxjs';

import { HttpClientService } from './http-client.service';
import { User } from '../model/user.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  /**
   * ログイン状態を通知するためのオブジェクト
   *
   * @private
   * @memberof UserService
   */
  private loginStatus = new BehaviorSubject<boolean>(false);

  /**
   * Subscribe するためのプロパティ
   *
   * @memberof UserService
   */
  public loginStatus$ = this.loginStatus.asObservable();

  private options: any = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      observe: 'response' // レスポンスのステータス参照のため
    }),
    withCredentials: true // Cookie利用のため
  };

  constructor(
    private httpClient: HttpClientService
  ) { }

  /**
   * ログイン状態の更新イベント
   *
   * @param {boolean} updated 更新データ
   * @memberof UserService
   */
  public onNotifyLoginStatusChanged(updated: boolean): void {
    this.loginStatus.next(updated);
  }

  public getCurrentLoginStatus(): boolean {
    return this.loginStatus.value;
  }

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

  public logout(): Promise<any> {
    const path = environment.url_api_logout;
    const httpRequest = new HttpRequest('GET', path, this.options);
    return this.httpClient.request<any>(httpRequest);
  }

}
