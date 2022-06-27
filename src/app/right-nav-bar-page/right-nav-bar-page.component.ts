import { Component, OnInit } from '@angular/core';
import * as industryData from '../industryData.json';
import { UtilsService } from '../utils.service';

@Component({
  selector: 'right-nav-bar-page',
  templateUrl: './right-nav-bar-page.component.html',
  styleUrls: ['./right-nav-bar-page.component.less']
})
export class RightNavBarPageComponent implements OnInit {
  industryData: any = industryData.data;

  constructor(private utils: UtilsService) { }

  ngOnInit() {
    // var sum = this.industryData.reduce((sum, curr) => sum + curr.taxSum, 0);
    var sum = 0;
    console.log(this.industryData)
    for (let industry of this.industryData) {
      sum += industry.taxSum;
    }
    for (let industry of this.industryData) {
      industry.headerSize = 10 * industry.taxSum / sum + 1;
    }
  }

  valueIntoMillions(amount) {
    return Math.floor(amount / 1000000) + " מיליון"
  }
}
