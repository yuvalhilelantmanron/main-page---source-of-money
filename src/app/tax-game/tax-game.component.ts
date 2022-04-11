import { Component, OnInit } from '@angular/core';
import { UtilsService } from '../utils.service'

@Component({
  selector: 'app-tax-game',
  templateUrl: './tax-game.component.html',
  styleUrls: ['./tax-game.component.less']
})
export class TaxGameComponent implements OnInit {
  public totalIncome: number = 0;
  public year: number = 2020;

  diff: number = 0;

  taxes: any = {
      1: "delek", 
      2: "maam",
      3: "tabak"
  }
  currTax: string = this.taxes[1];

  constructor(private utils: UtilsService) {
    this.getData();
  }

  ngOnInit() {
  }

  async getData() {
    var tax_code = '0000';
    var raw = await fetch("https://next.obudget.org/api/query?query=SELECT%20history%20FROM%20budget%20WHERE%20code=%27"+tax_code+"%27AND%20year>=2020%20ORDER%20BY%20year%20ASC%20LIMIT%201");
    var data = await raw.json();
    this.totalIncome = data.rows[0].history[this.year].net_executed;
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
