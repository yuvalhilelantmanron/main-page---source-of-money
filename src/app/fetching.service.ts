import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FetchingService {
  codes = [
    '0000180101',
    '0000140201',
    '00001501',
    '0000'
  ];
  all_data: any = {};
  latest_year = "2020";
  fetchAll_promise: any = this.fetchAll();
  

  constructor() {
   }

  async fetchAll(){
    var raw = await fetch("https://next.obudget.org/api/query?query=with%20combined%20as%20(%20SELECT%20d.key%20::%20integer%20as%20%22year%22,%20(%20(d.value%20::%20json)-%3E%3E%20%27net_executed%27%20)::%20numeric%20as%20%22net_executed%22,%20budget_.title,%20budget_.code%20FROM%20(%20select%20*%20from%20budget%20where%20year%20%3E%202020%20)%20as%20budget_%20join%20jsonb_each_text(budget_.history)%20d%20on%20true%20union%20SELECT%20year,%20net_executed,%20title,%20code%20from%20budget%20where%20year%20=%202020%20)%20select%20*%20from%20combined%20where%20combined.year%20=%20"+this.latest_year+"%20AND%20combined.code%20IN%20('"+this.codes.join("','")+"')");
    var data = await raw.json();
    for(let i = 0; i < this.codes.length; i++){
      this.all_data[this.codes[i]] = {
        data: data.rows[i]
      }
    }
  }

  async get(code) {
    await this.fetchAll_promise;
    return this.all_data[code].data;
  }

}
