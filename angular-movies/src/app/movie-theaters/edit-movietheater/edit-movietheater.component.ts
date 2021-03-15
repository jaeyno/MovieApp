import { movieTheatersCreationDto } from './../movie-theaters.model';
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
  model: movieTheatersCreationDto = {
    name: "Agora"
  }

  ngOnInit(): void {
    this.activateRoute.params.subscribe(params => {
      
    })
  }

  saveChanges(movieTheater: movieTheatersCreationDto) {

  }

}
