import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Overlay } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { MatSpinner } from '@angular/material/progress-spinner';
import { Subscription } from 'rxjs';

import { UserService } from '../../service/user.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit, OnDestroy {

  public isLoggedIn = false;

  private subscription: Subscription;

  private overlayRef = this.overlay.create({
    hasBackdrop: true,
    positionStrategy: this.overlay
      .position().global().centerHorizontally().centerVertically()
  });

  constructor(
    public userService: UserService,
    private router: Router,
    private overlay: Overlay
  ) { }

  ngOnInit() {
    // イベント登録
    // サービスで共有しているデータが更新されたら発火されるイベントをキャッチする
    this.subscription = this.userService.loginStatus$.subscribe(
      next => {
        this.isLoggedIn = next;
      }
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  public logout() {
    // スピナーの表示
    this.overlayRef.attach(new ComponentPortal(MatSpinner));

    this.userService.logout().then((res: HttpResponse<any>) => {
      // スピナーの非表示
      this.overlayRef.detach();

      if (res.status === 200) {
        this.router.navigate(['/main']);
        this.userService.onNotifyLoginStatusChanged(false);
      } else {
        // TODO: エラー処理
        // スピナーの非表示
        this.overlayRef.detach();
      }
    }, (err: any) => {
      // スピナーの非表示
      this.overlayRef.detach();
    });
  }
}
