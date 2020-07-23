import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';

import { environment } from '../../../environments/environment';
import { UserService } from '../../service/user.service';
import { DialogComponent } from '../dialog/dialog.component';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit, OnDestroy {

  public readonly srcDrip: string;
  public readonly srcPress: string;
  public readonly srcEspresso: string;
  public readonly srcLoupe: string;
  public readonly srcTeacup: string;
  public isLoggedIn: boolean;
  private subscription: Subscription;

  constructor(
    public userService: UserService,
    public dialog: MatDialog,
    private router: Router,
  ) {
    this.srcDrip = environment.url_img_base + 'coffee_paper_drip.png';
    this.srcPress = environment.url_img_base + 'press_tea_maker.png';
    this.srcEspresso = environment.url_img_base + 'espresso_maker.png';
    this.srcLoupe = environment.url_img_base + 'search_mushimegane.png';
    this.srcTeacup = environment.url_img_base + 'yuenchi_teacup.png';
  }

  ngOnInit() {
    // ログイン状態取得
    this.isLoggedIn = this.userService.getCurrentLoginStatus();

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

  // publicメソッド
  onClickPageLink(link: string) {
    if (!this.isLoggedIn) {
      this.dialog.open(DialogComponent, {
        data: {
          message: 'ページの利用にはログインが必要です。'
        }
      });
      // this.dialog.open(UnderConstructionComponent);
    } else {
      this.router.navigate([link]);
    }
  }

  onClickUnderConstruction() {
    this.dialog.open(DialogComponent, {
      data: {
        message: '申し訳ございません。\nこのページは準備中です。'
      }
    });
  }

  // privateメソッド

}
