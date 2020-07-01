import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { RecordService } from '../../service/record.service';
import { Recipe } from '../../model/recipe.model';

@Component({
  selector: 'app-record',
  templateUrl: './record.component.html',
  styleUrls: ['./record.component.scss']
})
export class RecordComponent implements OnInit {

  public recipe: Recipe　= new Recipe();
  public firstFormGroup: FormGroup;
  public secondFormGroup: FormGroup;
  public thirdFormGroup: FormGroup;

  public roasts: Array<string> = [
    'ライトロースト',
    'シナモンロースト',
    'ミディアムロースト',
    'ハイロースト',
    'シティロースト',
    'ハイシティロースト',
    'フレンチロースト',
    'イタリアンロースト'
  ];

  public grains: Array<string> = [
    '極細挽き',
    '細挽き',
    '中細挽き',
    '中挽き',
    '粗挽き'
  ];

  public ratings: Array<number> = [
    1,
    2,
    3,
    4,
    5
  ];

  public tastes: Array<string> = [
    '酸味が非常に強い',
    '酸味が強い',
    'バランスの取れた味わい',
    '苦味が強い',
    '苦味が非常に強い'
  ];

  constructor(
    private recordService: RecordService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {
  }

  ngOnInit() {
    this.firstFormGroup = this.formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this.formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
    this.thirdFormGroup = this.formBuilder.group({
      thirdCtrl: ['', Validators.required]
    });
  }

  public submit() {
    this.recordService.registerRecipe(this.recipe).subscribe(
      /*(res: number) => {
        if (res === 200) {
          console.log(res);
          // this.router.navigate(['/record/succeede']);
        } else {
          console.log(res);
          // this.router.navigate(['/under-construction']);
        }
      }*/
      res => this.router.navigate(['/record/succeeded'])
    );
  }

}
