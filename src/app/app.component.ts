import { Component, Inject, OnInit, HostListener } from '@angular/core';
import { BUBBLES } from './constants';


const _TRANSLATIONS = window['TRANSLATIONS'] || {};

export function __T(content) {
  const ret = _TRANSLATIONS[content];
  if (!ret) {
    return content;
  }
  return ret;
}


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent implements OnInit {
  public headline: string = 'מקור הכסף';
  public funcCategories: any[];
  public econCategories: any[];
  public incomeCategories: any[];
  public totalAmount = 0;
  public year: number;
  public __ = __T;
  public adVisible = false;
  public data: number = 0;

  constructor(@Inject(BUBBLES) private bubbles: any) {
    fetch('https://next.obudget.org/api/query?query=SELECT%20sum(net_revised)%20AS%20revised%2C%0A%20%20%20%20%20%20%20sum(net_allocated)%20AS%20allocated%2C%0A%20%20%20%20%20%20%20sum(net_executed)%20AS%20executed%0AFROM%20budget%0AWHERE%20func_cls_title_2-%3E%3E0%20%3D%20%27%D7%9E%D7%A1%D7%99%D7%9D%20%D7%99%D7%A9%D7%99%D7%A8%D7%99%D7%9D%27%0A%20%20AND%20YEAR%3D2020%0A%20%20AND%20depth%20%3D%204')
      .then(raw => raw.json())
      .then(data => this.data = data.rows[0].executed)
    this.year = this.bubbles.year;
    this.funcCategories = bubbles.func;
    this.econCategories = bubbles.econ;
    this.incomeCategories = bubbles.income;
    this.totalAmount = 0;
    this.funcCategories.forEach((category: any) => {
      this.totalAmount += category.amount;
    });
  }

  @HostListener('window:scroll', ['$event'])
  onScroll(event) {
    this.adVisible = window.scrollY < 30;
  }

  ngOnInit() {
    this.adVisible = true;
  }

  onNavigate(url: string) {
    window.location.href = url;
  }

}
