import { MovieTheatersService } from './../movie-theaters.service';
import { movieTheatersCreationDto, movieTheatersDto } from './../movie-theaters.model';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-movietheater',
  templateUrl: './edit-movietheater.component.html',
  styleUrls: ['./edit-movietheater.component.css']
})
export class EditMovietheaterComponent implements OnInit {

  constructor(private activateRoute: ActivatedRoute, private movieTheatersService: MovieTheatersService, private router: Router) { }
  
  //temporary raw data
  model: movieTheatersDto;

  ngOnInit(): void {
    this.activateRoute.params.subscribe(params => {
      this.movieTheatersService.getById(params.id).subscribe(movieTheater => this.model = movieTheater);
    })
  }

  saveChanges(movieTheater: movieTheatersCreationDto) {
    this.movieTheatersService.edit(this.model.id, movieTheater).subscribe(() => {
      this.router.navigate(['/movietheaters']);
    })
  }

}
