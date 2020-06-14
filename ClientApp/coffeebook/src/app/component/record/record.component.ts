import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { RecordService } from '../../service/record.service';
import { Recipe, Beans, Style, Evaluation } from '../../model/recipe.model';

@Component({
  selector: 'app-record',
  templateUrl: './record.component.html',
  styleUrls: ['./record.component.scss']
})
export class RecordComponent implements OnInit {

  public recipe: Recipe;
  public beans: Beans;
  public sytle: Style;
  public evaluation: Evaluation;

  constructor(
    private recordService: RecordService,
    private router: Router
  ) {
    /* クラス変数の初期化 */
    this.recipe = new Recipe();
    this.beans = new Beans();
    this.sytle = new Style();
    this.evaluation = new Evaluation();
  }

  ngOnInit() {
  }

  public submit() {
    this.recipe.userId = 'テストユーザ';
    this.recipe.beans = this.beans;
    this.recipe.style = this.sytle;
    this.recipe.evaluation = this.evaluation;
    /*this.recordService.registerRecipe(this.recipe).subscribe(
      (res: number) => {
        if (res === 200) {
          console.log(res);
          // this.router.navigate(['/record/succeede']);
        } else {
          console.log(res);
          // this.router.navigate(['/under-construction']);
        }
      }
    );*/
    this.recordService.registerRecipe(this.recipe)
      .subscribe(
        res => this.router.navigate(['/record/succeeded'])
      );
  }

}
