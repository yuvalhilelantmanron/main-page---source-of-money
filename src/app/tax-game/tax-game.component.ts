import { Component, OnInit } from '@angular/core';
import { FetchingService } from '../fetching.service';
import { UtilsService } from '../utils.service';

interface Tax {
  name: string;
  diff: string;
  cng: string;
  status: any;
}

@Component({
  selector: 'app-tax-game',
  templateUrl: './tax-game.component.html',
  styleUrls: ['./tax-game.component.less'],
})
export class TaxGameComponent implements OnInit {
  public totalIncome: number = 0;
  public year: number = 2020;

  lastDiff: number = 0;
  taxes: any = {
    1: {
      name: 'delek',
      diff: 0,
      total: 0,
      cng: 0,
      status: { cancel: false, ignore: false },
    },
    2: {
      name: 'maam',
      diff: 0,
      total: 0,
      cng: 0,
      status: { cancel: false, ignore: false },
    },
    3: {
      name: 'tabak',
      diff: 0,
      total: 0,
      cng: 0,
      status: { cancel: false, ignore: false },
    },
    4: {
      name: 'other',
      diff: 0,
      total: 0,
      cng: 0,
      status: { cancel: false, ignore: false },
    },
  };
  currTax: string = this.taxes[1].name;

  constructor(private utils: UtilsService, private fetching: FetchingService) {
    this.getData();
  }

  ngOnInit() {}

  async getData() {
    var tax_code = '0000';
    var data = await this.fetching.get(tax_code);
    this.totalIncome = data.net_executed;
  }

  public changeTax(evt, tax) {
    this.currTax = this.taxes[tax].name;

    // Remove highlight
    let taxButtons = document.getElementsByClassName('tax-btn');
    for (let i = 0; i < taxButtons.length; i++) {
      taxButtons[i].className = taxButtons[i].className.replace(' active', '');
    }

    // TODO: Remove highlight from other tax
    let otherTax = document.getElementsByClassName('other-tax-btn');
    otherTax[0].className = otherTax[0].className.replace(' active', '');

    // Add highlight to selected button
    evt.currentTarget.className += ' active';
  }

  totalDiff() {
    let total = 0;
    for (let i = 1; i <= 4; i++) {
      if (this.taxes[i].status.ignore) continue;
      if (this.taxes[i].status.cancel) total -= this.taxes[i].total;
      else total += this.taxes[i].diff;
    }
    return total;
  }

  formatNum(value): string {
    return this.utils.formatNumberWithSuffix(value, 2);
  }

  changeStatus(evt, number, status) {
    if (status == 2) {
      this.taxes[number].status.cancel = !this.taxes[number].status.cancel;
      this.taxes[number].status.ignore = false;
    } else if (status == 1) {
      this.taxes[number].status.ignore = !this.taxes[number].status.ignore;
      this.taxes[number].status.cancel = false;
    }

    let taxButtons = document.getElementsByClassName('status-' + number);
    for (let i = 0; i < taxButtons.length; i++) {
      if (taxButtons[i] != evt.currentTarget)
        taxButtons[i].className = taxButtons[i].className.replace(
          ' active',
          '',
        );
    }
    if (evt.currentTarget.className.search(' active') != -1)
      evt.currentTarget.className = evt.currentTarget.className.replace(
        ' active',
        '',
      );
    else evt.currentTarget.className += ' active';

    if (this.taxes[number].status.ignore) {
      this.taxes[number].diff = 0;
    } else if (this.taxes[number].status.cancel) {
      this.taxes[number].diff = 0 - this.taxes[number].total;
    } else if(!this.taxes[number].status.ignore && !this.taxes[number].status.cancel) {
      this.taxes[number].diff = this.lastDiff; // load previous diff
    }
  }
}
