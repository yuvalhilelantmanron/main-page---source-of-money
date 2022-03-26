import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-single-value-tax',
  templateUrl: './single-value-tax.component.html',
  styleUrls: ['./single-value-tax.component.less']
})
export class SingleValueTaxComponent implements OnInit {
  @Input() tax_type: any;
  @Input() new_tax: number;
  diff: number;
  taxes: any = {
    "delek": {
      tax_value: 21090000000, 
      current: 30,
      text_to_show: "אגורות לליטר"
    },
    "income": {
      tax_value: 167297000000,
      current: 25,
      text_to_show: "אחוזים"
    },
    "tabak": {
      tax_value: 600000000,
      current: 459,
      text_to_show: 'ש"ח לק"ג'
    }
  }

  constructor() { }

  ngOnInit() {
  }

  getTax(){
    return this.tax_type;
  }

  getDiff() {
    var simulated_value = this.taxes[this.tax_type].tax_value / (this.taxes[this.tax_type].current/100) * (this.new_tax/100);
    return simulated_value - this.taxes[this.tax_type].tax_value;
  }

}
