import { Injectable } from '@angular/core';

import { HttpClientService } from './http-client.service';
import { Const } from '../api/const';

@Injectable({
  providedIn: 'root'
})
export class RecordService {

  constructor(
    private httpClient: HttpClientService
  ) { }

  public registerRecipe(recipe: any) {
    this.httpClient.post(Const.URL_BACKEND, recipe, null)
      .subscribe();
  }
}
