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
  latest_year: number = 2020;
  taxes: any = {
    "delek": {
      get_current_value: async () => {
        var tax_code = '0000180101';
        var raw = await fetch("https://next.obudget.org/api/query?query=SELECT%20history%20FROM%20budget%20WHERE%20code=%27"+tax_code+"%27AND%20year>=2020%20ORDER%20BY%20year%20ASC%20LIMIT%201");
        var data = await raw.json();
        return data.rows[0].history[this.latest_year].net_executed;
      },
      current_rate: 3.13,
      text_to_show: "שקלים לליטר"
    },
    "maam": {
      get_current_value: async () => {
        var tax_code = '0000140201';
        var raw = await fetch("https://next.obudget.org/api/query?query=SELECT%20history%20FROM%20budget%20WHERE%20code=%27"+tax_code+"%27AND%20year>=2020%20ORDER%20BY%20year%20ASC%20LIMIT%201");
        var data = await raw.json();
        return data.rows[0].history[this.latest_year].net_executed;
      },
      current_rate: 17,
      text_to_show: "אחוזים"
    },
    "tabak": {
      get_current_value: async () => {
        var tax_code = '00001501';
        var raw = await fetch("https://next.obudget.org/api/query?query=SELECT%20net_executed%20FROM%20budget%20WHERE%20code=%27"+tax_code+"%27AND%20year=%27"+this.latest_year+"%27");
        var data = await raw.json();
        return data.rows[0].net_executed
      },
      current_rate: 459,
      text_to_show: 'ש"ח לק"ג'
    }
  }

  constructor() { }

  async ngOnInit() {
  }

  getTax(){
    return this.tax_type;
  }

  async getDiff() {
    var new_value = await this.taxes[this.tax_type].get_current_value() / this.taxes[this.tax_type].current_rate * this.new_rate;

    this.onChange.emit({value: new_value - await this.taxes[this.tax_type].get_current_value(), rate: this.new_rate})
  }

}
