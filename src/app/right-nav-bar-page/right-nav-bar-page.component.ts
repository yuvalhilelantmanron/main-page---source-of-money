import { Component, OnInit } from '@angular/core';

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
  ans1: string = ""
  ans2: string = ""
  ans3: string = ""
  ans4: string = ""
  ans5: string = ""
  img1: string = ""
  num: number = 1;
  tax: number;
  showImgs = false;
  constructor() { }

  ngOnInit() {
  }

  logval(income: number, kids: number, type: string) {
    this.inKids = kids;
    this.inIncome = income;
    this.inType = type;
    this.tax = income * 3;
    this.ans4 = "יש לך " + kids + "ילדים ואתה גר ב" + type;
    this.showImgs = true;
  }
}
