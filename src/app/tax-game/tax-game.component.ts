import { Component, ViewChild, OnInit } from '@angular/core';
import { SingleValueTaxComponent } from './single-value-tax/single-value-tax.component';


@Component({
  selector: 'app-tax-game',
  templateUrl: './tax-game.component.html',
  styleUrls: ['./tax-game.component.less']
})
export class TaxGameComponent implements OnInit {
  @ViewChild(SingleValueTaxComponent) svt;
  diff: number;

  constructor() { }

  ngOnInit() {
  }

  getDiff() {
    this.diff = this.svt.getDiff()
  }

}
