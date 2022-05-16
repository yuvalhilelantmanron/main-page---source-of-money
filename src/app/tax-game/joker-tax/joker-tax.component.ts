import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FetchingService } from 'src/app/fetching.service';

@Component({
  selector: 'app-joker-tax',
  templateUrl: './joker-tax.component.html',
  styleUrls: ['./joker-tax.component.less']
})
export class JokerTaxComponent implements OnInit {
  taxes: Array<any> = [];
  chosen_taxes: Array<any> = [];
  new_rates: Array<number> = [];
  @Output() onChange = new EventEmitter();
  @Output() onLoad = new EventEmitter();

  constructor(private fetching: FetchingService) { }

  ngOnInit() {
  }

  async fetchTaxes(other_tax:string) {
    let data = await this.fetching.fetchTaxByTitle(other_tax);
    this.taxes = data;
  }

  addTax(chosen_tax) {
    this.chosen_taxes.push(chosen_tax);
    // TODO: grey out purple box and make user unable to click it so it won't be added a second time
  }

  deleteTax(tax_to_delete) {
    let index = this.chosen_taxes.indexOf(tax_to_delete);
    this.chosen_taxes.splice(index, 1);
    this.new_rates.splice(index, 1);
    this.diff();
  }

  diff(){
    let total_diff = 0;
    for(let i=0; i<this.chosen_taxes.length; i++) {
      if(this.new_rates[i] != null){
        total_diff += this.chosen_taxes[i].net_executed*this.new_rates[i]/100 - this.chosen_taxes[i].net_executed;
      }
    }

    this.onChange.emit({
      value: total_diff,
    });

  }

  async getTotal() {
    let sum = 0;
    for(let i=0; i<this.chosen_taxes.length; i++){
      sum += this.chosen_taxes[i].net_executed;
    }
    this.onLoad.emit({
      total: sum,
    });
  }

}
