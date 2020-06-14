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
    this.srcDrip = environment.img_base_url + 'coffee_paper_drip.png';
    this.srcPress = environment.img_base_url + 'press_tea_maker.png';
    this.srcEspresso = environment.img_base_url + 'espresso_maker.png';
    this.srcLoupe = environment.img_base_url + 'search_mushimegane.png';
    this.srcTeacup = environment.img_base_url + 'yuenchi_teacup.png';
  }

  ngOnInit() {
  }

  // publicメソッド

  // privateメソッド

}
