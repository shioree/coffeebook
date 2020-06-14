import { Component, OnInit } from '@angular/core';
import { HttpHeaders, HttpRequest, HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { RecordService } from '../../service/record.service';
import { Recipe } from '../../model/recipe.model';

@Component({
  selector: 'app-browse',
  templateUrl: './browse.component.html',
  styleUrls: ['./browse.component.scss']
})
export class BrowseComponent implements OnInit {

  public recipes: Array<Recipe>;

  constructor(
    private recordService: RecordService
  ) {
    this.recipes = new Array<Recipe>();
  }

  ngOnInit() {
    this.recordService.fetchRecipe().then((res: HttpResponse<any>) => {
      console.log(res.body);
      // this.recipes.push(res.body);
      this.recipes = res.body;
      // const array: Array<Recipe> = res.body;
      // array.forEach((value, index, a) => {
        // console.log(value);
        // const tmp = JSON.parse(value);
        // console.log(tmp);
        // const tmp: Recipe = JSON.parse(value);
        // console.log(tmp);
        // this.recipes.push(value);
      // });
      // this.recipes = array;
      // this.recipes.push(res.body);
    });
  }

}
