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
  imgstr: string = "none";
  inType : string = ""
  ans1 : string = ""
  ans2 : string = ""
  ans3 : string = ""
  ans4 : string = ""
  ans5 : string = ""
  img1 : string = ""
  num: number = 1;
  tax: number;
  constructor() { }

  ngOnInit() {
  }

  logval(income: number,kids: number,type: string){
    this.img1 = "";
    this.inKids = kids;
    this.inIncome = income;
    this.inType = type;
    this.tax = income*3;
    // split ans because thay get displayed in defrint colors
    this.ans1 = "אתה משלם כ";
    this.ans2 =  "₪" + income*3;
    this.ans3 = "מיסים למדינה";
    this.ans4 = "יש לך " + kids + "ילדים ואתה גר ב" + type;
    this.ans5 = "המחשה של איפה המיסים שלך עוזרים:" ;
    // Which img to disply 
    if(income*3 > 100){
      this.imgstr = "block"
      this.img1 = "/assets/img/abc.png";
    }
    else{
      this.imgstr = "block"
      this.img1 = "/assets/img/bca.png";
    }
    
  }

}
