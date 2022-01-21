import { Component, OnInit, Input , OnChanges, SimpleChanges} from '@angular/core';

@Component({
  selector: 'nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.less']
})
export class NavBarComponent implements OnChanges{
  leftCaption: string = "אגרות חוב וגרעון";
  middleCaption: string = "מיסי הכנסה אל מול מיסי הוצאה";
  rightCaption: string = "כמה אני מכניס למדינה";
  
  currentlySelected: string = "middle";
  
  @Input() fetchedData : any;

  public layout = {
    xaxis:{
      autorange:true,
      title:{text:'year'},
      type:"category",
      seperatethousands:false
    },
    yaxis:{
      autorange:true,
      title:{text:'amount'},
      type:"linear",
      seperatethousands:false
    }
  }

  public data = [
    {
      mode:'lines+markers',
      name:'מסים ישירים',
      x:[],
      y:[],
    },
    {
      mode:'lines+markers',
      name:'מסים עקיפים',
      x:[],
      y:[],
    }
  ]

  constructor() {

  }

  ngOnChanges() {
    if(!this.fetchedData) return;

    for(let item of this.fetchedData){
      if(item.executed  == null) continue;
      if(item.func_title == 'מסים ישירים'){
        this.data[0].y.push(item.executed);
        this.data[0].x.push(item.year);
      }
      else if(item.func_title == 'מסים עקיפים'){
        this.data[1].y.push(item.executed);
        this.data[1].x.push(item.year);
      }
    }
    this.data = this.data.slice();
  }
  
    changeCurrentlySelected(newSelected: string) {
    this.currentlySelected = newSelected;
  }

}
