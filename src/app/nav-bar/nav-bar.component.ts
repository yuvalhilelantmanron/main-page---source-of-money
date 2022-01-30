import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.less']
})
export class NavBarComponent {
  leftCaption: string = "אגרות חוב וגרעון";
  middleCaption: string = "מיסי הכנסה אל מול מיסי הוצאה";
  rightCaption: string = "כמה אני מכניס למדינה";

  currentlySelected: string = "middle";

  @Input() fetchedData: any;


  constructor() {

  }

  changeCurrentlySelected(newSelected: string) {
    this.currentlySelected = newSelected;
  }

}
