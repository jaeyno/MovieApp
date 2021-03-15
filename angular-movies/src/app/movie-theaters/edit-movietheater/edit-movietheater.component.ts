import { movieTheatersCreationDto, movieTheatersDto } from './../movie-theaters.model';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-movietheater',
  templateUrl: './edit-movietheater.component.html',
  styleUrls: ['./edit-movietheater.component.css']
})
export class EditMovietheaterComponent implements OnInit {

  constructor(private activateRoute: ActivatedRoute) { }
  
  //temporary raw data
  model: movieTheatersDto = {
    name: "Agora",
    latitude: 33.6549653627227,
    longitude: -84.42433957010508
  }

  ngOnInit(): void {
    this.activateRoute.params.subscribe(params => {
      
    })
  }

  saveChanges(movieTheater: movieTheatersCreationDto) {

  }

}
