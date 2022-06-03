import { Component, Inject, OnInit, HostListener } from '@angular/core';
import { BUBBLES } from './constants';
import { TranslateService } from '@ngx-translate/core';

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


  public giraonSum = 0;
  public data: any;

  constructor(@Inject(BUBBLES) private bubbles: any, public translate: TranslateService) {
    this.newGetData();
    translate.addLangs(['he', 'ar']);
    translate.setDefaultLang('he');
    const browserLang = translate.getBrowserLang();
    translate.use(browserLang.match(/he|ar/) ? browserLang : 'he');
  }

  async getData(bubbles) {
    //fetches data from url
    var raw = await fetch('https://next.obudget.org/api/query?query=SELECT%20year,%20func_cls_title_2-%3E%3E0%20as%20func_title,%20sum(net_revised)%20AS%20revised,%20sum(net_allocated)%20AS%20allocated,%20sum(net_executed)%20AS%20executed%20FROM%20budget%20WHERE%20depth%20=%204%20and%20code%20like%20%270000%%%27%20group%20by%201,%202%20order%20by%202,%201')
    var data = await raw.json();
    data = data.rows;
    this.data = data;

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

  async newGetData() {
    //fetches data from url
    var raw = await fetch('https://next.obudget.org/api/query?query=SELECT%20year,%20func_cls_title_2-%3E%3E0%20as%20func_title,%20title,%20sum(net_revised)%20AS%20revised,%20sum(net_allocated)%20AS%20allocated,%20sum(net_executed)%20AS%20executed,%20code%20AS%20code%20FROM%20budget%20WHERE%20depth%20=%202%20and%20code%20like%20%270000%%%27%20group%20by%201,%202,%203,%207%20order%20by%202,%201');
    var data = await raw.json();
    data = data.rows;
    this.data = data;

    //gets the most current year
    var lastTitle = data[0].func_title;
    for (var item of data) {
      if (item.func_title != lastTitle) break;
      this.year = Math.max(this.year, item.year);
    }

    //creates an ordered diconary from data
    var minimizedData = {};
    this.totalAmount = 0;
    for (var item of data) {
      if (item.year != this.year || item.allocated == 0) continue;

      if(item.func_title == "הכנסות למימון גירעון"){
        this.giraonSum += item.allocated;
        continue;
      }

      if (!minimizedData[item.func_title])
        minimizedData[item.func_title] = { name: item.func_title, scale: 1, amount: 0, values: {} };

      minimizedData[item.func_title].amount += item.allocated;
      minimizedData[item.func_title].values[item.title] = { amount: item.allocated, href: `https://next.obudget.org/i/budget/${item.code}/${item.year}` };
      this.totalAmount += item.allocated;
    }

    //turns diconary into array
    var minimizedArray = [];
    for (let item in minimizedData) {
      minimizedArray.push(minimizedData[item]);
    }

    //sets a max amount of subcategories
    for (let item of minimizedArray) {
      var arrOfSub = [];
      for (let sub in item.values) {
        arrOfSub.push({ ...item.values[sub], name: sub });
      }

      let maxAmount = 5;

      if (arrOfSub.length > maxAmount - 1) {
        var sortedSub = arrOfSub.sort((a, b) => b.amount - a.amount);

        var sortedSubData = {}
        for (let sub of sortedSub.slice(0, maxAmount - 1)) {
          var shortName = sub.name;
          if (shortName.length > 10)
            shortName = shortName.slice(0, 10) + "...";
          sortedSubData[sub.name] = { ...sub, shortName: shortName };
        }
        item.values = sortedSubData;

        var otherSum = sortedSub.slice(maxAmount - 1, sortedSub.length).reduce((sum, curr) => sum += curr.amount, 0);

        if (otherSum > 0)
          item.values['אחר'] = { amount: otherSum, name: 'אחר' };
      }
    }

    //gets the percentage of each category
    for (item of minimizedArray)
      item.percent = (item.amount / this.totalAmount) * 100;

    minimizedArray.sort((a, b) => b.amount - a.amount)
    this.funcCategories = minimizedArray;
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
