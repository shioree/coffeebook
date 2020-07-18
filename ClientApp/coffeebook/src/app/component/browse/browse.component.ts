import { Component, OnInit } from '@angular/core';
import { HttpHeaders, HttpRequest, HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { RecordService } from '../../service/record.service';
import { Recipe, SearchConditions, SearchModels } from '../../model/recipe.model';

@Component({
  selector: 'app-browse',
  templateUrl: './browse.component.html',
  styleUrls: ['./browse.component.scss']
})
export class BrowseComponent implements OnInit {

  public recipes = new Array<Recipe>();
  public recipesNarrowedDown = new Array<Recipe>();
  public conditions = new SearchConditions();
  public searchModels = new SearchModels();
  public isLoading = true;

  constructor(
    private recordService: RecordService
  ) {
    // this.recipes = new Array<Recipe>();
    // this.recipesNarrowedDown = new Array<Recipe>();
    // this.isLoading = true;
  }

  ngOnInit() {
    this.recordService.fetchRecipe().then((res: HttpResponse<any>) => {
      this.recipesNarrowedDown = this.recipes = res.body;
    });
    this.isLoading = false;
  }

  public narrowDown() {
    this.recipesNarrowedDown = this.recipes;
    if (this.conditions.rating !== 0) {
      this.recipesNarrowedDown = this.recipesNarrowedDown.filter(word => word.evaluation.rating >= this.conditions.rating);
    }
    if (this.conditions.taste !== 0) {
      this.recipesNarrowedDown = this.recipesNarrowedDown.filter(word => word.evaluation.taste === this.conditions.taste);
    }
    if (this.conditions.shop !== '') {
      this.recipesNarrowedDown = this.recipesNarrowedDown.filter(word => word.beans.shop === this.conditions.shop);
    }
  }

}
