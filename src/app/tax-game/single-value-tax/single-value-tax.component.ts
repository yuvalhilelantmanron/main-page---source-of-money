import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-single-value-tax',
  templateUrl: './single-value-tax.component.html',
  styleUrls: ['./single-value-tax.component.less']
})
export class SingleValueTaxComponent implements OnInit {
  @Input() tax_type: any;
  new_rate: number;
  taxes: any = {
    "delek": {
      current_value: 21090000000, 
      current_rate: 30,
      text_to_show: "אגורות לליטר"
    },
    "income": {
      current_value: 167297000000,
      current_rate: 25,
      text_to_show: "אחוזים"
    },
    "tabak": {
      current_value: 600000000,
      current_rate: 459,
      text_to_show: 'ש"ח לק"ג'
    }
  }

  constructor() { }

  ngOnInit() {
  }

  onEnter(value: number) {
    this.new_rate = value;
  }

  getTax(){
    return this.tax_type;
  }

  getDiff() {
    var new_value = this.taxes[this.tax_type].current_value / (this.taxes[this.tax_type].current_rate/100) * (this.new_rate/100);
    return new_value - this.taxes[this.tax_type].current_value;
  }

}
