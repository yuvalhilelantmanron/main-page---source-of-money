import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.less']
})
export class NavBarComponent implements OnInit {
  leftCaption: string = "אגרות חוב וגרעון";
  middleCaption: string = "מיסי הכנסה אל מול מיסי הוצאה";
  rightCaption: string = "כמה אני מכניס למדינה";

  currentlySelected: string = "middle";

  constructor() { }

  ngOnInit() {

  }

  changeCurrentlySelected(newSelected: string) {
    this.currentlySelected = newSelected;
  }

}
