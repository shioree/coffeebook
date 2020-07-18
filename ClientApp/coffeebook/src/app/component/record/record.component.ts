import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpResponse } from '@angular/common/http';

import { Overlay } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { MatSpinner } from '@angular/material/progress-spinner';

import { RecordService } from '../../service/record.service';
import { Recipe, FormModels } from '../../model/recipe.model';

@Component({
  selector: 'app-record',
  templateUrl: './record.component.html',
  styleUrls: ['./record.component.scss']
})
export class RecordComponent implements OnInit {

  public recipe: Recipe　= new Recipe();
  public formModels = new FormModels();
  public isSucceded = true;

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

    this.recordService.register(this.recipe).then((res: HttpResponse<any>) => {
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
