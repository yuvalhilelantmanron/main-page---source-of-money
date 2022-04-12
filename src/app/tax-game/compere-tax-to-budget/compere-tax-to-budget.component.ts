import { Component, OnInit,Input, OnChanges } from '@angular/core';

@Component({
  selector: 'compere-tax-to-budget',
  templateUrl: './compere-tax-to-budget.component.html',
  styleUrls: ['./compere-tax-to-budget.component.less']
})
export class CompereTaxToBudgetComponent implements OnInit, OnChanges{

  @Input() diff;
  latest_year = 2020;
  public arr = [];
  public name1 = '';
  public name2 = '';
  public name3 = '';
  public percentge1 = 0;
  public percentge2 = 0;
  public percentge3 = 0;
  public one: number = 0;
  public two: number = 0;
  public three: number = 0;
  public total: number = 0;
  public budget: number = 0;
  public increase: number = 0;
  public difference : number = 0;
  public map = [{name:"בטחון", percentge: 0},{name:"רווחה", percentge: 0},{name:"רזרבה", percentge: 0},{name:"תחבורה", percentge: 0},{name:"גמלאות", percentge: 0},{name:"בינוי ושיכון", percentge: 0},{name:"קליטת עליה", percentge: 0},{name:"משרד החינוך", percentge: 0},{name:"משרד הבריאות", percentge: 0},{name:"כלכלה ותעשיה", percentge: 0},{name:"משרד המשפטים", percentge: 0},{name:"מדע תרבות וספורט", percentge: 0}];


  constructor() { }

  ngOnInit() {
    this.get_current_budget();
  }

  ngOnChanges(){
    this.get_percentage();
    this.get_three_random_numbers();
    this.set_three_numbers();

  }

  async get_current_budget() {
    var tax_code = ' ';
    for (var i = 0; i < 12; i++) {
      switch ( i ) {
        case 0:
            tax_code = 'C1';//בטחון  
            break;
        case 1:
            tax_code = 'C224';//רווחה 
            break;
        case 2:
            tax_code = 'C552';//חקלאות
            break;
        case 3:
            tax_code = '0079';//תחבורה 
            break;
        case 4:
            tax_code = 'C771';//גמלאות  
            break;
        case 5:
            tax_code = 'C334';//בינוי ושיכון 
            break;
        case 6:
            tax_code = 'C227';//קליטת עליה 
            break;
        case 7:
            tax_code = '0020';//משרד החינוך 
            break;
        case 8:
            tax_code = '0024';//משרד הבריאות 
            break;
        case 9:
            tax_code = 'C553';//כלכלה ותעשיה 
            break;
        case 10:
            tax_code = 'C443'; //משרד המשפטים 
            break;
        case 11:
            tax_code = 'C226';//מדע תרבות וספורט  
            break;
     } 
      var raw = await fetch("https://next.obudget.org/api/query?query=SELECT%20year,%20code,%20title,%20history,%20net_executed%20FROM%20budget%20WHERE%20code=%27"+tax_code+"%27AND%20year>=2020%20ORDER%20BY%20year%20ASC%20LIMIT%201");
      var data = await raw.json();
      this.arr[i] = data.rows[0].history[this.latest_year].net_executed;
    }
    console.log(this.arr);
  }
  
  get_percentage(){
    for (var i = 0; i < 12; i++) {
      this.budget = this.arr[i];
      this.total = this.budget + this.diff ;
      this.difference = this.total - this.budget;
      this.increase = (this.difference / this.budget) * 100;
      this.map[i].percentge = this.increase;
    }
    console.log(this.map);
  }

  getRandomInt() {
    return Math.floor(Math.random() * (11 - 0 + 1)) + 0;
  }

  get_three_random_numbers(){
    this.one = this.getRandomInt();
    this.two = this.getRandomInt();
    this.three = this.getRandomInt();
  }

  set_three_numbers(){
    this.name1 = this.map[this.one].name; 
    this.percentge1 = this.map[this.one].percentge;
    this.name2 = this.map[this.two].name; 
    this.percentge2 = this.map[this.two].percentge;
    this.name3 = this.map[this.three].name; 
    this.percentge3 = this.map[this.three].percentge;
  }

}
