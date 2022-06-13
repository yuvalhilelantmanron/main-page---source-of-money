import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'middle-nav-bar-page',
  templateUrl: './middle-nav-bar-page.component.html',
  styleUrls: ['./middle-nav-bar-page.component.less']
})
export class MiddleNavBarPageComponent {

  @Input() fetchedData: any;
  @Input() giraon: any;

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
      x: ["עד 6,300", "מ6,300 עד 9,100", "מ6,300 עד 9,100", "מ9,100 עד 14,600", "מ9,100 עד 14,600", "מ14,600 עד 20,300", "מ14,600 עד 20,300", "מ20,300 עד 42,200", "מ20,300 עד 42,200", "מ42,200 עד 53,400", "מ42,200 עד 53,400", "53,400 ומעלה", "53,400 ומעלה"],
      y: [10, 10, 14, 14, 20, 20, 31, 31, 35, 35, 47, 47, 50],
    },
    {
      mode: 'lines+markers',
      name: 'מסים עקיפים',
      x: [],
      y: [],
    }
  ];
}
