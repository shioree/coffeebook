import { Injectable } from '@angular/core';
import { HttpHeaders, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';

import { HttpClientService } from './http-client.service';
import { Const } from '../api/const';
import { Observable, of } from 'rxjs';

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

  /* public registerRecipe(recipe: any): Observable<number> {
    return this.httpClient.post(Const.URL_BACKEND, recipe, this.options).pipe(
      map((res: HttpResponse<any>) => res.status),
      catchError((err: HttpErrorResponse) => of(err.status))
    );
  }*/

  public registerRecipe(recipe: any): Observable<any> {
    return this.httpClient.post(Const.URL_BACKEND, recipe, this.options);
  }

  /*public registerRecipe(recipe: any): number {
    let st: number;
    this.httpClient.post(Const.URL_BACKEND, recipe, this.options).subscribe(
      res => {
        console.log(res.status);
        st = res.status;
      });
    return st;
  }*/

}
