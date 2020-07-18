import { Component, OnInit } from '@angular/core';
import { HttpHeaders, HttpRequest, HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Overlay } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { MatSpinner } from '@angular/material/progress-spinner';

import { RecipeService } from '../../service/recipe.service';
import { Recipe, SearchConditions, SearchModels, DeleteModel } from '../../model/recipe.model';

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
  public isSearchOpen = false;

  private overlayRef = this.overlay.create({
    hasBackdrop: true,
    positionStrategy: this.overlay
      .position().global().centerHorizontally().centerVertically()
  });

  constructor(
    private recordService: RecipeService,
    private overlay: Overlay
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

  public setOpenStatus() {
    this.isSearchOpen = true;
  }

  public narrowDown() {
    this.recipesNarrowedDown = this.recipes;
    if (this.conditions.rating !== 0) {
      this.recipesNarrowedDown = this.recipesNarrowedDown.filter(recipe => recipe.evaluation.rating >= this.conditions.rating);
    }
    if (this.conditions.taste !== 0) {
      this.recipesNarrowedDown = this.recipesNarrowedDown.filter(recipe => recipe.evaluation.taste === this.conditions.taste);
    }
    if (this.conditions.shop !== '') {
      this.recipesNarrowedDown = this.recipesNarrowedDown.filter(recipe => recipe.beans.shop === this.conditions.shop);
    }
    this.isSearchOpen = false;
  }

  public onDelete(id: string) {
    // スピナーの表示
    this.overlayRef.attach(new ComponentPortal(MatSpinner));

    const deleteModel = new DeleteModel(id);

    this.recordService.delete(deleteModel).then((res: HttpResponse<any>) => {
      // スピナーの非表示
      this.overlayRef.detach();

      if (res.status === 200) {
        this.recipes = this.recipes.filter(recipe => recipe.id !== deleteModel.id);
        this.recipesNarrowedDown = this.recipesNarrowedDown.filter(recipe => recipe.id !== deleteModel.id);
      } else {
        // this.isSucceded = false;
      }
    }, (err: any) => {
      // スピナーの非表示
      this.overlayRef.detach();
      // this.isSucceded = false;
    });
  }

}
