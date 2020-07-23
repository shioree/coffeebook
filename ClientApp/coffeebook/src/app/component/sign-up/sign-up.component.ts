import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Overlay } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { MatSpinner } from '@angular/material/progress-spinner';

import { UserService } from '../../service/user.service';
import { User } from '../../model/user.model';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  public user: User = new User();
  public isSucceded = true;
  public errorMessage: string;
  private readonly badRequestMessage = 'ユーザー登録に失敗しました。<br>しばらくしてから、再度登録してください。';

  private overlayRef = this.overlay.create({
    hasBackdrop: true,
    positionStrategy: this.overlay
      .position().global().centerHorizontally().centerVertically()
  });

  constructor(
    private userService: UserService,
    private router: Router,
    private overlay: Overlay
  ) { }

  ngOnInit() {
  }

  public submit() {
    // スピナーの表示
    this.overlayRef.attach(new ComponentPortal(MatSpinner));

    this.userService.signUp(this.user)
      .then((res: HttpResponse<any>) => {
        // スピナーの非表示
        this.overlayRef.detach();

        if (res.status === 200) {
          this.router.navigate(['/sign-up/succeeded']);
        } else {
          this.isSucceded = false;
          this.errorMessage = this.badRequestMessage;
        }
      })
      .catch((err: HttpErrorResponse) => {
        // スピナーの非表示
        this.overlayRef.detach();

        this.isSucceded = false;
        if (err.status === 409) {
          this.errorMessage = err.error; // ユーザーIDの重複
        } else {
          this.errorMessage = this.badRequestMessage;
        }
      });
  }

}
