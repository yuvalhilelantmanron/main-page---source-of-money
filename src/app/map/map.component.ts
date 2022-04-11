import { Component, OnInit, Inject } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import * as mapData from '../mapData.json';


@Component({
  selector: 'map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.less']
})
export class MapComponent implements OnInit {
  map: mapboxgl.Map;
  style = 'mapbox://styles/mapbox/navigation-day-v1';
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
      // console.log((mapData as any).default);
      this.map.addSource('cityData', {
        'type': 'geojson',
        'data': (mapData as any).default
      });


      this.map.addLayer(
        {
          "id": "city",
          "source": "cityData",
          "type": "circle",
          "circle-radius": {
            property: 'population',
            type: 'exponential',
          }
        }
      );
    })
  }
}
