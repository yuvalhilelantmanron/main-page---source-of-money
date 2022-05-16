import { Component, OnInit } from '@angular/core';
import { FetchingService } from 'src/app/fetching.service';

@Component({
  selector: 'app-joker-tax',
  templateUrl: './joker-tax.component.html',
  styleUrls: ['./joker-tax.component.less']
})
export class JokerTaxComponent implements OnInit {
  taxes: Array<any> = [];
  tax: any;

  constructor(private fetching: FetchingService) { }

  ngOnInit() {
  }

  async fetchTaxes(other_tax:string) {
    let data = await this.fetching.fetchTaxByTitle(other_tax);
    this.taxes = data;
  }

  onClick(chosen_tax) {
    this.tax = chosen_tax;
  }

}
