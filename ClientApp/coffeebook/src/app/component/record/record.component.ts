import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

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
    private recordService: RecordService,
    private router: Router
  ) {
    this.recipe = new Recipe();
  }

  ngOnInit() {
  }

  public submit() {
    this.recipe.userId = 'テストユーザ';
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
