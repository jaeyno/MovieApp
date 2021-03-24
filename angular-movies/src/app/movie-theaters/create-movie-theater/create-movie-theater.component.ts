import { Router } from '@angular/router';
import { MovieTheatersService } from './../movie-theaters.service';
import { movieTheatersCreationDto } from './../movie-theaters.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-movie-theater',
  templateUrl: './create-movie-theater.component.html',
  styleUrls: ['./create-movie-theater.component.css']
})
export class CreateMovieTheaterComponent implements OnInit {

  constructor(private movieTheatersService: MovieTheatersService, private router: Router) { }

  ngOnInit(): void {
  }

  saveChanges(movieTheater: movieTheatersCreationDto) {
    console.log(movieTheater);
    this.movieTheatersService.create(movieTheater).subscribe(() => this.router.navigate(['/movietheaters']));
  }

}
