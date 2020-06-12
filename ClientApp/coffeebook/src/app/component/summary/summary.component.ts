import { Component, OnInit, Input } from '@angular/core';

import { Summary } from '../../model/system.model';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss']
})
export class SummaryComponent implements OnInit {

  @Input() summary: Summary;

  constructor() { }

  ngOnInit() {
  }

}
