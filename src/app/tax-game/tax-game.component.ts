import { Component, OnInit } from '@angular/core';
import { UtilsService } from '../utils.service'

@Component({
  selector: 'app-tax-game',
  templateUrl: './tax-game.component.html',
  styleUrls: ['./tax-game.component.less']
})
export class TaxGameComponent implements OnInit {
  totalIncome: number = 123456789; // TODO: Get real total income

  diff: number = 0;

  tax1Cng = "+1";
  tax2Cng = "+2";
  tax3Cng = "+3";
  tax4Cng = "+4";
  tax5Cng = "+5";
  
  taxes: any = {
      1: "delek", 
      2: "maam",
      3: "tabak"
  }
  currTax: string = this.taxes[1];

  constructor(private utils: UtilsService) { }

  ngOnInit() {
  }

  public changeTax(evt, tax) {
    this.currTax = this.taxes[tax];

    // Remove highlight
    let taxButtons = document.getElementsByClassName("tax-btn");
    for (let i = 0; i < taxButtons.length; i++) {
      taxButtons[i].className = taxButtons[i].className.replace(" active", "");
    }

    // Add highlight to selected button
    evt.currentTarget.className += " active";
  }

  formatNum(value) : string {
    return this.utils.formatNumber(value, 2);
  }
}
