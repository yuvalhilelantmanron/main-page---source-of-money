import { Component, OnInit } from '@angular/core';
import * as industryData from '../industryData.json';

@Component({
  selector: 'right-nav-bar-page',
  templateUrl: './right-nav-bar-page.component.html',
  styleUrls: ['./right-nav-bar-page.component.less']
})
export class RightNavBarPageComponent implements OnInit {
  industryData: any = industryData.data;

  constructor() { }

  ngOnInit() {
    var sum = this.industryData.reduce((sum, curr) => sum + curr.amount, 0);
    for (let industry of this.industryData) {
      industry.headerSize = 10 * industry.amount / sum + 1;
    }
  }

  valueIntoMillions(amount) {
    return Math.floor(amount / 1000000) + " מיליון"
  }
}
