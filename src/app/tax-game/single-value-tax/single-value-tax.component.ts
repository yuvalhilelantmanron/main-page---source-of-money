import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-single-value-tax',
  templateUrl: './single-value-tax.component.html',
  styleUrls: ['./single-value-tax.component.less']
})
export class SingleValueTaxComponent implements OnInit {
  @Input() tax_type: any;
  @Output() onChange = new EventEmitter();
  new_rate: number;
  taxes: any = {
    "delek": {
      get_current_value: async () => {
        var raw = await fetch("https://next.obudget.org/api/query?query=SELECT%20code,year,net_executed,history%20FROM%20budget%20WHERE%20code=%270000180101%27");
        var data = await raw.json();
        return data.rows[2].history["2020"].net_executed
      },
      current_rate: 30,
      text_to_show: "אגורות לליטר"
    },
    "maam": {
      get_current_value: async () => {
        var raw = await fetch("https://next.obudget.org/api/query?query=SELECT%20code,year,net_executed,history,title%20FROM%20budget%20WHERE%20code=%270000140201%27");
        var data = await raw.json();
        return data.rows[1].history["2020"].net_executed
      },
      current_rate: 17,
      text_to_show: "אחוזים"
    },
    "tabak": {
      get_current_value: async () => {
        var raw = await fetch("https:next.obudget.org/api/query?query=SELECT%20code,year,net_executed,history%20FROM%20budget%20WHERE%20code=%2700001501%27AND%20year=%272020%27");
        var data = await raw.json();
        return data.rows[0].net_executed
      },
      current_rate: 459,
      text_to_show: 'ש"ח לק"ג'
    }
  }

  constructor() { }

  ngOnInit() {

  }

  getTax(){
    return this.tax_type;
  }

  async getDiff() {
    var new_value = await this.taxes[this.tax_type].get_current_value() / (this.taxes[this.tax_type].current_rate/100) * (this.new_rate/100);

    this.onChange.emit({value: new_value - await this.taxes[this.tax_type].get_current_value()})
  }

}
