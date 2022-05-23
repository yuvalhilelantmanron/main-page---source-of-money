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
  is_fetching: boolean = false;
  found_result: boolean = true;
  @Output() onChange = new EventEmitter();
  @Output() onLoad = new EventEmitter();

  constructor(private fetching: FetchingService) { }

  ngOnInit() {
  }

  async fetchTaxes(other_tax:string) {
    this.found_result = true;
    this.is_fetching = true;
    let data = await this.fetching.fetchTaxByTitle(other_tax);
    this.is_fetching = false;
    this.taxes = data;
    if(!this.taxes.length) { this.found_result = false };
  }

  isChosen(title) {
    for(let i=0; i < this.chosen_taxes.length; i++){
      if(this.chosen_taxes[i].title == title)
        return true;
    }
    return false;
  }

  activate() {
    let taxBtns = document.getElementsByClassName('option-tax-btn');
    for (let i = 0; i < taxBtns.length; i++) {
      if(!this.isChosen(taxBtns[i].innerHTML))
        taxBtns[i].className = taxBtns[i].className.replace(' active', '');
    }
  }

  addTax(evt, chosen_tax) {
    if(!this.isChosen(chosen_tax.title)) 
      this.chosen_taxes.push(chosen_tax);

    this.activate();
  
    evt.currentTarget.className += ' active';
  }

  deleteTax(tax_to_delete) {
    let index = this.chosen_taxes.indexOf(tax_to_delete);
    this.chosen_taxes.splice(index, 1);
    this.new_rates.splice(index, 1);
    this.diff();
    this.activate()
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
