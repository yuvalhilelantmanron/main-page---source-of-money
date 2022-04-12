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
  demo_value: number;
  taxes: any = {
    "delek": {
      get_current_value: async () => {
        var tax_code = '0000180101';
        var raw = await fetch("https://next.obudget.org/api/query?query=SELECT%20history%20FROM%20budget%20WHERE%20code=%27"+tax_code+"%27AND%20year>=2020%20ORDER%20BY%20year%20ASC%20LIMIT%201");
        var data = await raw.json();
        return data.rows[0].history[this.latest_year].net_executed;
      },
      current_rate: 3.13,
      units: "שקלים לליטר",
      demo_text: " לדוגמה ניקח מיכל של",
      demo_placeholder: "40",
      demo_units: "ליטרים",
      demo_result_text: "תשלום עבור מילוי של מיכל זה ",
      normalizer: 1
    },
    "maam": {
      get_current_value: async () => {
        var tax_code = '0000140201';
        var raw = await fetch("https://next.obudget.org/api/query?query=SELECT%20history%20FROM%20budget%20WHERE%20code=%27"+tax_code+"%27AND%20year>=2020%20ORDER%20BY%20year%20ASC%20LIMIT%201");
        var data = await raw.json();
        return data.rows[0].history[this.latest_year].net_executed;
      },
      current_rate: 17,
      units: "אחוזים",
      demo_text: " לדוגמה ניקח מוצר שמחירו",
      demo_placeholder: "3000",
      demo_units: "שקלים",
      demo_result_text: "תשלום עבור מוצר זה",
      normalizer: 100
    },
    "tabak": {
      get_current_value: async () => {
        var tax_code = '00001501';
        var raw = await fetch("https://next.obudget.org/api/query?query=SELECT%20net_executed%20FROM%20budget%20WHERE%20code=%27"+tax_code+"%27AND%20year=%27"+this.latest_year+"%27");
        var data = await raw.json();
        return data.rows[0].net_executed
      },
      current_rate: 459,
      units: 'ש"ח לק"ג',
      demo_text: " לדוגמה טבק לגלגול במשקל",
      demo_placeholder: "50",
      demo_units: "גרם",
      demo_result_text: "תשלום עבור הטבק",
      normalizer: 1000
    }
  }

  constructor() { }

  async ngOnInit() {
    this.demo_value = this.taxes[this.tax_type].demo_placeholder;
    
  }

  getTax(){
    return this.tax_type;
  }

  getNewRate(){
    return this.new_rate;
  }

  abs(number) {
    return Math.abs(number);
  }

  async getDiff() {
    var new_value = await this.taxes[this.tax_type].get_current_value() / this.taxes[this.tax_type].current_rate * this.new_rate;

    this.onChange.emit({value: new_value - await this.taxes[this.tax_type].get_current_value(), rate: this.new_rate})
  }

}
