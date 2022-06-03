import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.less']
})
export class NavBarComponent {
  leftCaption: string = "משחק המסים";
  middleCaption: string = "נושאים להעמקה";
  rightCaption: string = "פילוחים נוספים";


  currentlySelected: string = "middle";

  @Input() fetchedData: any;
  @Input() giraonSum:number;

  constructor() {

  }

  changeCurrentlySelected(newSelected: string) {
    this.currentlySelected = newSelected;
  }

}
