import { Component, OnInit, Inject, Input } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import * as mapData from '../mapData.json';


@Component({
  selector: 'map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.less']
})
export class MapComponent implements OnInit {
  map: mapboxgl.Map;
  style = 'mapbox://styles/mapbox/light-v10';
  lat = 31.55;
  lng = 34.99;
  hoveredStateId = null;

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
      this.map.addSource('city_data', {
        'type': 'geojson',
        'data': (mapData as any).default
      });

      // this.map.addLayer(
      //   {
      //     id: "city_layout",
      //     source: 'city_data',
      //     type: 'line',
      //     color: 'black'
      //   }
      // )

      this.map.addLayer({
        'id': 'city_fill',
        'type': 'fill',
        'source': 'city_data',
        'paint': {
          'fill-color':
            [
              "interpolate",
              ["linear"],
              ["get", "@id"],
              0,
              "hsl(0, 7%, 11%)",
              4,
              "hsl(360, 100%, 54%)"
            ]
        }
      });
    })
  }
}
