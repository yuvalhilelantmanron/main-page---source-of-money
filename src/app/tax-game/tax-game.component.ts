import { Component, OnInit } from '@angular/core';
import { UtilsService } from '../utils.service'

@Component({
  selector: 'app-tax-game',
  templateUrl: './tax-game.component.html',
  styleUrls: ['./tax-game.component.less']
})
export class TaxGameComponent implements OnInit {
  public totalIncome: number = 0;
  public year: number = 0;

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

  constructor(private utils: UtilsService) {
    this.getData();
  }

  ngOnInit() {
  }

  async getData() {
    //fetches data from url
    var raw = await fetch('https://next.obudget.org/api/query?query=SELECT%20year,%20func_cls_title_2-%3E%3E0%20as%20func_title,%20title,%20sum(net_revised)%20AS%20revised,%20sum(net_allocated)%20AS%20allocated,%20sum(net_executed)%20AS%20executed%20FROM%20budget%20WHERE%20depth%20=%202%20and%20code%20like%20%270000%%%27%20group%20by%201,%202,%203%20order%20by%202,%201');
    var data = await raw.json();
    data = data.rows;

    //gets the most current year
    var lastTitle = data[0].func_title;
    for (var item of data) {
      if (item.func_title != lastTitle) break;
      this.year = Math.max(this.year, item.year);
    }

    // Add income value
    this.totalIncome = 0;
    for (var item of data) {
      if (item.year != this.year || item.func_title == "הכנסות למימון גירעון" || item.allocated == 0) continue;

      this.totalIncome += item.allocated;
    }
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
