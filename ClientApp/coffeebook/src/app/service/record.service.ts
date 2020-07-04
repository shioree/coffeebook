import { Injectable } from '@angular/core';
import { HttpHeaders, HttpRequest, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

import { HttpClientService } from './http-client.service';
import { Recipe } from '../model/recipe.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RecordService {

  private options: any = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      observe: 'response'
    }),
    body: null
  };

  constructor(
    private httpClient: HttpClientService
  ) { }

  /* public registerRecipe(recipe: any): Observable<any> {
    // return this.httpClient.post(environment.url_api_register, recipe, this.options);
    return this.httpClient.post(environment.url_api_register, recipe, this.options).pipe(
      // HTTPステータスコードを戻す
      map((res: HttpResponse<any>) => res.status),
      // エラー時もHTTPステータスコードを戻す
      catchError((err: HttpErrorResponse) => of(err.status))
    );
  } */

  public register(recipe: Recipe): Promise<any> {
    const path = environment.url_api_register;
    const options: any = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        observe: 'response'
      })
    };
    const httpRequest = new HttpRequest('POST', path, recipe, options);
    return this.httpClient.request<any>(httpRequest);
  }

  public fetchRecipe(): Promise<any> {
    const path = environment.url_api_fetch;
    const httpRequest = new HttpRequest('GET', path, this.options);
    return this.httpClient.request<any>(httpRequest);
  }

}
