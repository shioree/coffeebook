import { Component, OnInit } from '@angular/core';

import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-tips',
  templateUrl: './tips.component.html',
  styleUrls: ['./tips.component.scss']
})
export class TipsComponent implements OnInit {

  public readonly srcBarista: string;

  constructor() {
    this.srcBarista = environment.url_img_base + 'job_barista_woman.png';
  }

  ngOnInit() {
  }

}
