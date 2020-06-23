import { Component, OnInit, Input } from '@angular/core';

import { Recipe } from '../../model/recipe.model';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.scss']
})
export class RecipeComponent implements OnInit {

  @Input() recipe: Recipe;
  @Input() even: boolean;

  constructor() { }

  ngOnInit() {
  }

  isBright(index: number, value: number) {
    return value >= index;
  }

}
