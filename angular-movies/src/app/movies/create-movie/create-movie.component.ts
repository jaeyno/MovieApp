import { Router } from '@angular/router';
import { movieTheatersDto } from './../../movie-theaters/movie-theaters.model';
import { multipleSelectorModel } from './../../utilities/multiple-selector/multiple-selector.model';
import { MoviesService } from './../movies.service';
import { movieCreationDto } from './../movies.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-movie',
  templateUrl: './create-movie.component.html',
  styleUrls: ['./create-movie.component.css']
})
export class CreateMovieComponent implements OnInit {

  constructor(private moviesService: MoviesService, private router: Router) { }

  nonSelectedGenres: multipleSelectorModel[];
  nonSelectedMovieTheaters: multipleSelectorModel[];

  ngOnInit(): void {
    this.moviesService.postGet().subscribe(response => {
      this.nonSelectedGenres = response.genres.map(genre => {
        return <multipleSelectorModel> {key: genre.id, value: genre.name}
      })

      this.nonSelectedMovieTheaters = response.movieTheaters.map(movieTheater => {
        return <multipleSelectorModel> {key: movieTheater.id, value: movieTheater.name}
      })
    })
  }

  saveChanges(movieCreationDto: movieCreationDto) {
    console.log(movieCreationDto);
    this.moviesService.create(movieCreationDto).subscribe(() => {
      this.router.navigate(['']);
    })
  }
}
