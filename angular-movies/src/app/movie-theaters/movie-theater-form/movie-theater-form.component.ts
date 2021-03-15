import { coordinatesMap } from './../../utilities/map/coordinate';
import { movieTheatersCreationDto } from './../movie-theaters.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-movie-theater-form',
  templateUrl: './movie-theater-form.component.html',
  styleUrls: ['./movie-theater-form.component.css']
})
export class MovieTheaterFormComponent implements OnInit {

  @Output() onSaveChanges = new EventEmitter<movieTheatersCreationDto>();
  @Input() model: movieTheatersCreationDto;

  form: FormGroup;

  initialCoordinates: coordinatesMap[] = [];

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: ['', {validators: [Validators.required]}],
      latitude: ['', {validators: [Validators.required]}],
      longitude: ['', {validators: [Validators.required]}],
    })

    if (this.model !== undefined) {
      this.form.patchValue(this.model)
      this.initialCoordinates.push({latitude: this.model.latitude, longitude: this.model.longitude})
    }
  }

  onSelectedLocation(coordinates: coordinatesMap) {
    this.form.patchValue(coordinates);
  }

  saveChanges() {
    this.onSaveChanges.emit(this.form.value);
  }

}
