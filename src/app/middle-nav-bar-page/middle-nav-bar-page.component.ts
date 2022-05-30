import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'middle-nav-bar-page',
  templateUrl: './middle-nav-bar-page.component.html',
  styleUrls: ['./middle-nav-bar-page.component.less']
})
export class MiddleNavBarPageComponent implements OnChanges {

  @Input() fetchedData: any;

  public taxPercentagesLayout = {
    xaxis: {
      autorange: true,
      title: { text: 'כמות' },
      type: "category",
      seperatethousands: false
    },
    yaxis: {
      autorange: true,
      title: { text: 'אחוז המס' },
      type: "linear",
      seperatethousands: false
    }
  }

  public taxPercentagesData = [
    {
      mode: 'lines+markers',
      name: 'מסים ישירים',
      x: ["עד 6,300", "מ6,300 עד 9,100", "מ9,100 עד 14,600", "מ14,600 עד 20,300", "מ20,300 עד 42,200", "מ42,200 עד 53,400", "53,400 ומעלה"],
      y: [10, 14, 20, 31, 35, 47, 50],
    },
    {
      mode: 'lines+markers',
      name: 'מסים עקיפים',
      x: [],
      y: [],
    }
  ]

  public taxTypesLayout = {
    xaxis: {
      autorange: true,
      title: { text: 'year' },
      type: "category",
      seperatethousands: false
    },
    yaxis: {
      autorange: true,
      title: { text: 'amount' },
      type: "linear",
      seperatethousands: false
    }
  }

  public taxTypesData = [
    {
      mode: 'lines+markers',
      name: 'מסים ישירים',
      x: [],
      y: [],
    },
    {
      mode: 'lines+markers',
      name: 'מסים עקיפים',
      x: [],
      y: [],
    }
  ]

  ngOnChanges() {
    if (!this.fetchedData) return;

    let sortedData = [{}, {}];
    for (let item of this.fetchedData) {
      if (item.func_title == 'מסים ישירים') {
        if (!sortedData[0][item.year])
          sortedData[0][item.year] = 0;
        sortedData[0][item.year] += item.executed;
      }
      else if (item.func_title == 'מסים עקיפים') {
        if (!sortedData[1][item.year])
          sortedData[1][item.year] = 0;
        sortedData[1][item.year] += item.executed;
      }
    }

    for (let year in sortedData[0]) {
      this.taxTypesData[0].y.push(sortedData[0][year]);
      this.taxTypesData[0].x.push(year);
    }

    for (let year in sortedData[1]) {
      this.taxTypesData[1].y.push(sortedData[1][year]);
      this.taxTypesData[1].x.push(year);
    }

    this.taxTypesData = this.taxTypesData.slice();
  }
}
