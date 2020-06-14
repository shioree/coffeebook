import { Component, OnInit } from '@angular/core';

import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  public readonly srcDrip: string;
  public readonly srcPress: string;
  public readonly srcEspresso: string;
  public readonly srcLoupe: string;
  public readonly srcTeacup: string;

  constructor() {
    this.srcDrip = environment.url_img_base + 'coffee_paper_drip.png';
    this.srcPress = environment.url_img_base + 'press_tea_maker.png';
    this.srcEspresso = environment.url_img_base + 'espresso_maker.png';
    this.srcLoupe = environment.url_img_base + 'search_mushimegane.png';
    this.srcTeacup = environment.url_img_base + 'yuenchi_teacup.png';
  }

  ngOnInit() {
  }

  // publicメソッド

  // privateメソッド

}
