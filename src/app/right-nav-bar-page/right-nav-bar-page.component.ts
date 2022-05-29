import { Component, OnInit } from '@angular/core';
import * as industryData from '../industryData.json';

@Component({
  selector: 'right-nav-bar-page',
  templateUrl: './right-nav-bar-page.component.html',
  styleUrls: ['./right-nav-bar-page.component.less']
})
export class RightNavBarPageComponent implements OnInit {
  propertyTypes: Array<string> = ['בית', 'דירה'];
  inIncome: number;
  inKids: number;
  inType: string = ""
  ans4: string = ""
  img1: string = ""
  num: number = 1;
  tax: number;
  showImgs = false;

  industryData: any = industryData.data;
  bingbong: "5px";

  constructor() { }

  ngOnInit() {
    var sum = this.industryData.reduce((sum, curr) => sum + curr.amount, 0);
    for (let industry of this.industryData) {
      industry.headerSize = 10 * industry.amount / sum + 1;
    }
  }

  logval(income: number, kids: number, type: string) {
    this.inKids = kids;
    this.inIncome = income;
    this.inType = type;
    this.tax = income * 3;
    this.ans4 = "יש לך " + kids + "ילדים ואתה גר ב" + type;
    this.showImgs = true;
  }
  valueIntoMillions(amount) {
    return Math.floor(amount / 1000000) + " מיליון"
  }
}
