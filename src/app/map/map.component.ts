import { Component, OnInit } from '@angular/core';
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
  prevE: any = null;

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
      this.map.addSource('city_data', {
        'type': 'geojson',
        'data': (mapData as any).default
      });

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

      const popup = new mapboxgl.Popup({
        closeButton: false,
        closeOnClick: false
      });

      this.map.on('mousemove', 'city_fill', (e) => {
        if (this.prevE == e)
          return
        this.prevE = e;
        this.map.getCanvas().style.cursor = 'pointer';

        var coordinates = e.features[0].geometry.coordinates[0];
        var cityName = e.features[0].properties["name:he"];
        var description: any = `<div style='color:red'>${cityName}</div>`;

        var topCoordinate = { lng: coordinates[0][0], lat: coordinates[0][1] }
        for (let coordinate of coordinates) {
          if (coordinate[1] > topCoordinate.lat) {
            topCoordinate = { lng: coordinate[0], lat: coordinate[1] }
          }
        }

        popup.setLngLat(topCoordinate).setHTML(description).addTo(this.map);
      });

      this.map.on('mouseleave', 'city_fill', () => {
        this.map.getCanvas().style.cursor = '';
        popup.remove();
      });
    })
  }
}
