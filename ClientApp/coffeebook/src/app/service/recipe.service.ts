import { Injectable } from '@angular/core';
import { HttpHeaders, HttpRequest } from '@angular/common/http';

import { HttpClientService } from './http-client.service';
import { Recipe, DeleteModel } from '../model/recipe.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

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

  public register(recipe: Recipe): Promise<any> {
    const path = environment.url_api_register;
    const httpRequest = new HttpRequest('POST', path, recipe, this.options);
    return this.httpClient.request<any>(httpRequest);
  }

  public fetchRecipe(): Promise<any> {
    const path = environment.url_api_fetch;
    const httpRequest = new HttpRequest('GET', path, this.options);
    return this.httpClient.request<any>(httpRequest);
  }

  public delete(deleteModel: DeleteModel): Promise<any> {
    const path = environment.url_api_delete;
    const httpRequest = new HttpRequest('POST', path, deleteModel, this.options);
    return this.httpClient.request<any>(httpRequest);
  }

}
