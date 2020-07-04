import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { HttpResponse } from '@angular/common/http';

import { Overlay } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { MatSpinner } from '@angular/material/progress-spinner';

import { RecordService } from '../../service/record.service';
import { Recipe } from '../../model/recipe.model';

@Component({
  selector: 'app-record',
  templateUrl: './record.component.html',
  styleUrls: ['./record.component.scss']
})
export class RecordComponent implements OnInit {

  public recipe: Recipe　= new Recipe();
  public isSucceded = true;

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

  private overlayRef = this.overlay.create({
    hasBackdrop: true,
    positionStrategy: this.overlay
      .position().global().centerHorizontally().centerVertically()
  });

  constructor(
    private recordService: RecordService,
    private router: Router,
    private overlay: Overlay
  ) {
  }

  ngOnInit() {
  }

  public submit() {
    // スピナーの表示
    this.overlayRef.attach(new ComponentPortal(MatSpinner));

    /* this.recordService.registerRecipe(this.recipe).subscribe((res: number) => {
      // スピナーの非表示
      this.overlayRef.detach();

      console.log(res);

      if (res === 200) {
        this.router.navigate(['/record/succeeded']);
      } else {
        this.isSucceded = false;
      }
    }, (err: any) => {
      // スピナーの非表示
      this.overlayRef.detach();
      this.isSucceded = false;
    }); */

    this.recordService.register(this.recipe).then((res: HttpResponse<any>) => {
      console.log(res.status);

      // スピナーの非表示
      this.overlayRef.detach();

      if (res.status === 200) {
        this.router.navigate(['/record/succeeded']);
      } else {
        this.isSucceded = false;
      }
    }, (err: any) => {
      // スピナーの非表示
      this.overlayRef.detach();
      this.isSucceded = false;
    });
  }

}
