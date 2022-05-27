import { Component, ElementRef, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FetchingService } from 'src/app/fetching.service';
import { UtilsService } from '../../utils.service';

@Component({
  selector: 'app-single-value-tax',
  templateUrl: './single-value-tax.component.html',
  styleUrls: ['./single-value-tax.component.less'],
})
export class SingleValueTaxComponent implements OnInit {
  @Input() tax_type: any;
  @Input() total_diff: number;
  @Output() onChange = new EventEmitter();
  @Output() onLoad = new EventEmitter();
  new_rate: number;
  latest_year: number = 2020;
  demo_value: number;
  enough_to_balance: boolean = true;
  taxes: any = {
    delek: {
      code: '0000180101',
      current_rate: 3.05585,
      units: "שקלים לליטר",
      demo_text: " לדוגמה ניקח מיכל של",
      demo_placeholder: "40",
      demo_units: "ליטרים",
      demo_result_text: "תשלום עבור מילוי של מיכל זה ",
      normalizer: 1,
      description: "הוא מס בסכום קבוע עבור כל ליטר ומטרתו לצמצם את צריכת הדלק בישראל.",
      url: "https://next.obudget.org/i/budget/0000180101/2019?li=0&theme=budgetkey",
      title: "מס דלק"
    },
    maam: {
      code: '0000140201',
      current_rate: 17,
      units: "אחוזים",
      demo_text: " לדוגמה ניקח מוצר שמחירו",
      demo_placeholder: "3000",
      demo_units: "שקלים",
      demo_result_text: "תשלום עבור מוצר זה",
      normalizer: 100,
      description: '(מס ערך מוסף) הוא מס המוטל על כל קניה. סכום המע"מ מחושב בשיעור קבוע ממחיר הרכישה.',
      url: "https://next.obudget.org/i/budget/0000140201/2019?li=0&theme=budgetkey",
      title: 'מע"מ'
    },
    tabak: {
      code: '00001501',
      current_rate: 1097.24,
      units: 'ש"ח לק"ג',
      demo_text: " לדוגמה טבק לגלגול במשקל",
      demo_placeholder: "50",
      demo_units: "גרם",
      demo_result_text: "תשלום עבור הטבק",
      normalizer: 1000,
      description: "מוטל על מוצרי טבק בסכום קבוע לקילוגרם ומטרתו לצמצם צריכה של מוצרים כמו סיגריות.",
      url: "https://next.obudget.org/i/budget/00001501/2016?li=1&theme=budgetkey",
      title: "מס טבק"
    }
  }

  constructor(private utils: UtilsService, private fetching: FetchingService) {}

  async ngOnInit() {
    this.demo_value = this.taxes[this.tax_type].demo_placeholder;
    await this.getTotal();

  }

  getTax() {
    return this.tax_type;
  }

  getNewRate() {
    return this.new_rate;
  }

  abs(number) {
    return Math.abs(number);
  }

  formatNum(value): string {
    return this.utils.formatNumberWithSuffix(value, 2);
  }

  async getDiff() {
    var data = await this.fetching.get(this.taxes[this.tax_type].code);
    var new_value =
      (data.net_executed /
        this.taxes[this.tax_type].current_rate) *
      this.new_rate;

    if(this.new_rate == null) {
      this.onChange.emit({
        value: 0,
        rate: this.new_rate,
      });
    }
    else {
      this.onChange.emit({
        value: new_value - (await this.fetching.get(this.taxes[this.tax_type].code)).net_executed,
        rate: this.new_rate,
      });
    }
  }

  async getTotal() {
    this.onLoad.emit({
      total: (await this.fetching.get(this.taxes[this.tax_type].code)).net_executed,
    });
  }

  async balanceOut(){
    var tax = await this.fetching.get(this.taxes[this.tax_type].code);
    let balance_rate = (this.taxes[this.tax_type].current_rate / tax.net_executed) * (tax.net_executed - this.total_diff);

    if(balance_rate < 0){
      this.enough_to_balance = false;
    } else {
      this.new_rate = balance_rate;
      this.getDiff();
      this.enough_to_balance = true;  
    }
  }
}
