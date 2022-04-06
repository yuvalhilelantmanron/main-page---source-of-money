import { Component, OnInit, Inject } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import { MAPDATA } from '../constants';


@Component({
  selector: 'map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.less']
})
export class MapComponent implements OnInit {

  map: mapboxgl.Map;
  style = 'mapbox://styles/mapbox/outdoors-v9';
  lat = 31.55;
  lng = 34.99;

  constructor() {
    mapboxgl.accessToken = 'pk.eyJ1IjoiYnVkZ2V0a2V5IiwiYSI6ImNsMWdscGN4cjAwcXUzZHVqMTNubGJvODQifQ.-3UrIwz_R4UcmNFpfSlPKg';
  }

  ngOnInit() {
    this.initializeMap();
  }

  initializeMap() {
    this.map = new mapboxgl.Map({
      container: 'map',
      style: this.style,
      zoom: 5.5,
      center: [this.lng, this.lat]
    });

    this.map.on('load', () => {
      // console.log(this.mapData);
      // this.map.addSource('mapData', this.mapData);
    })
  }


}
