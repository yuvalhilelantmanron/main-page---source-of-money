import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.less']
})
export class NavBarComponent implements OnInit {
  propertyTypes: Array<string> = ['בית', 'דירה'];
  leftCaption: string = "left";
  middleCaption: string = "middle";
  rightCaption: string = "right";
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
  

  currentlySelected: string = "middle";

  constructor() { }

  ngOnInit() {

  }

  changeCurrentlySelected(newSelected: string) {
    this.currentlySelected = newSelected;
  }

  logval(income: number,kids: number,type: string){
    this.img1 = "";
    this.inKids = kids;
    this.inIncome = income;
    this.inType = type;
    this.tax = income*3;
    this.ans1 = "אתה משלם כ";
    this.ans2 =  "₪" + income*3;
    this.ans3 = "מיסים למדינה";
    this.ans4 = "יש לך " + kids + "ילדים ואתה גר ב" + type;
    this.ans5 = "המחשה של איפה המיסים שלך עוזרים:" ;
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
