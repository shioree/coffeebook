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
      this.recipes = res.body;
    });
  }

}
