import { Component, OnInit, Input, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';

import { Recipe } from '../../model/recipe.model';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.scss']
})
export class RecipeComponent implements OnInit {

  @Input() recipe: Recipe;
  @Input() even: boolean;

  @Output() delete = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  isBright(index: number, value: number) {
    return value >= index;
  }

  public onDelete() {
    this.delete.emit(this.recipe.id);
  }

}
