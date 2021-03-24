import { coordinatesMap, coordinatesMapWithMessage } from './coordinate';
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { latLng, LeafletMouseEvent, marker, Marker, tileLayer } from 'leaflet';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    this.layers = this.initialCoordinates.map(value => {
      const m = marker([value.latitude, value.longitude]);
      
      if (value.message) {
        m.bindPopup(value.message, {autoClose: false, autoPan: false});
      }

      return m;
    });
  }

  @Output() onSelectedLocation = new EventEmitter<coordinatesMap>();
  @Input() initialCoordinates: coordinatesMapWithMessage[] = [];
  @Input() editMode: boolean = true;

  options = {
    layers: [
      tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, attribution: 'Angular Movies' })
    ],
    zoom: 10,
    center: latLng(33.74373910548805, -84.39493149518968)
  };

  layers: Marker<any>[] = [];

  handleMapClick(event: LeafletMouseEvent) {
    if (this.editMode) {
      const latitude = event.latlng.lat;
      const longitude = event.latlng.lng;
      console.log({latitude, longitude})
      this.layers = [];
      this.layers.push(marker([latitude, longitude]));
      this.onSelectedLocation.emit({latitude, longitude});
    }
  }

}
