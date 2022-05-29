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
    //creates a map object and shows it in the browser under the html class 'map'
    this.map = new mapboxgl.Map({
      container: 'map',
      style: this.style,
      zoom: 5.5,
      center: [this.lng, this.lat]
    });

    //adds map data to the map object
    this.map.on('load', () => {
      this.map.addSource('city_data', {
        'type': 'geojson',
        'data': (mapData as any).default
      });

      //adds a half transperant red colored layer for each city 
      //      with its redness based on the taxes that it pays in total
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
              "hsla(0, 7%, 11%, 0.8)",
              4,
              "hsla(360, 100%, 54%, 0.8)"
            ]
        }
      });

      //creates an object of type poput to be used later
      const popup = new mapboxgl.Popup({
        closeButton: false,
        closeOnClick: false
      });

      //mousemove event listner for showing a city popup with its description
      this.map.on('mousemove', 'city_fill', (e) => {
        if (this.prevE == e)
          return
        this.prevE = e;
        this.map.getCanvas().style.cursor = 'pointer';

        //gets data about the hovered city
        var coordinates = e.features[0].geometry.coordinates[0];
        var cityName = e.features[0].properties["name:he"];
        var description: any = `<div>${cityName}</div>`;

        //finds the highest part of the city geomatry to put the popup there
        var topCoordinate = { lng: coordinates[0][0], lat: coordinates[0][1] }
        for (let coordinate of coordinates) {
          if (coordinate[1] > topCoordinate.lat) {
            topCoordinate = { lng: coordinate[0], lat: coordinate[1] }
          }
        }

        //shows the popup
        popup.setLngLat(topCoordinate).setHTML(description).addTo(this.map);
      });

      //hides the popup when when the mouse leaves the city geomatry
      this.map.on('mouseleave', 'city_fill', () => {
        this.map.getCanvas().style.cursor = '';
        popup.remove();
      });
    })
  }
}
