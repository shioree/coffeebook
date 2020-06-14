import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';

import { Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpClientService {

  private httpOptions: any = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    }),
    body: null
  };

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  public get(url: string, httpParams: any, callback: any): void {
    if (httpParams) {
      this.httpOptions.httpParams = httpParams;
    }
    this.http.get(url, this.httpOptions)
      .subscribe(
        (res) => {
          const response: any = res;
          callback(response);
        },
        (error) => {
          this.router.navigate(['/error']);
        }
      );
  }

  public post(url: string, body: any, options: any): Observable<any> {
    return this.http.post(url, body, options);
  }

}
