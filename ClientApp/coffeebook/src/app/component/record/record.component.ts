import { Component, OnInit } from '@angular/core';

import { RecordService } from '../../service/record.service';
import { Recipe } from '../../model/recipe.model';

@Component({
  selector: 'app-record',
  templateUrl: './record.component.html',
  styleUrls: ['./record.component.scss']
})
export class RecordComponent implements OnInit {

  public recipe: Recipe;

  constructor(
    private recordService: RecordService
  ) {
    this.recipe = new Recipe();
  }

  ngOnInit() {
  }

  public submit() {
    this.recipe.userId = 'testuser';
    this.recordService.registerRecipe(this.recipe);
  }

}
