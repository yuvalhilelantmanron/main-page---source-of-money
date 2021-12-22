import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.less']
})
export class NavBarComponent implements OnInit {
  leftCaption: string = "left";
  middleCaption: string = "middle";
  rightCaption: string = "right";

  currentlySelected: string = "middle";

  constructor() { }

  ngOnInit() {

  }

  changeCurrentlySelected(newSelected: string) {
    this.currentlySelected = newSelected;
  }

}
