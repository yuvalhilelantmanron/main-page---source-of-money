import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tax-game',
  templateUrl: './tax-game.component.html',
  styleUrls: ['./tax-game.component.less']
})
export class TaxGameComponent implements OnInit {
  diff: number;
  tax1Cng = "+1";
  tax2Cng = "+2";
  tax3Cng = "+3";
  tax4Cng = "+4";
  tax5Cng = "+5";

  constructor() { }

  ngOnInit() {
  }

  public changeTax(evt, tax) {
    // TODO: Change tax type

    // Remove highlight
    let taxButtons = document.getElementsByClassName("tax-btn");
    for (let i = 0; i < taxButtons.length; i++) {
      taxButtons[i].className = taxButtons[i].className.replace(" active", "");
    }

    // Add highlight to selected button
    evt.currentTarget.className += " active";
  }
}
