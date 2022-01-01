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
  public year: number = 0;
  public __ = __T;
  public adVisible = false;

  constructor(@Inject(BUBBLES) private bubbles: any) {
    // this.year = this.bubbles.year;
    // this.funcCategories = bubbles.func;
    // this.econCategories = bubbles.econ;
    // this.incomeCategories = bubbles.income;
    // this.totalAmount = 0;
    // this.funcCategories.forEach((category: any) => {
    //   this.totalAmount += category.amount;
    // });
    this.getData(bubbles);
  }

  async getData(bubbles) {
    //fetches data from url
    var raw = await fetch('https://next.obudget.org/api/query?query=SELECT%20year,%20func_cls_title_2-%3E%3E0%20as%20func_title,%20sum(net_revised)%20AS%20revised,%20sum(net_allocated)%20AS%20allocated,%20sum(net_executed)%20AS%20executed%20FROM%20budget%20WHERE%20depth%20=%204%20and%20code%20like%20%270000%%%27%20group%20by%201,%202%20order%20by%202,%201')
    var data = await raw.json();
    data = data.rows;

    //gets the most current year
    var lastTitle = data[0].func_title;
    for (var item of data) {
      if (item.func_title != lastTitle) break;
      this.year = Math.max(this.year, item.year);
    }

    //creates an array of data
    var minimizedData = [];
    this.totalAmount = 0;
    for (var item of data) {
      if (item.year != this.year || item.func_title == "הכנסות למימון גירעון") continue;

      let value = bubbles.func[minimizedData.length].values;
      minimizedData.push({ name: item.func_title, scale: 1, amount: item.allocated, values: value });
      this.totalAmount += item.allocated;
    }

    //gets the percentage of each category
    for (item of minimizedData)
      item.percent = (item.amount / this.totalAmount) * 100;

    minimizedData.sort((a, b) => b.amount - a.amount)
    this.funcCategories = minimizedData;
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
