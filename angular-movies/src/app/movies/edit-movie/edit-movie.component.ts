import { actorsMovieDto } from 'src/app/actors/actors.model';
import { multipleSelectorModel } from './../../utilities/multiple-selector/multiple-selector.model';
import { MoviesService } from './../movies.service';
import { movieCreationDto, movieDto } from './../movies.model';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-movie',
  templateUrl: './edit-movie.component.html',
  styleUrls: ['./edit-movie.component.css']
})
export class EditMovieComponent implements OnInit {

  model: movieDto;
  selectedGenres: multipleSelectorModel[];
  nonSelectedGenres: multipleSelectorModel[];
  selectedMovieTheaters: multipleSelectorModel[];
  nonSelectedMovieTheaters: multipleSelectorModel[];
  selectedActors: actorsMovieDto[];

  constructor(private activateRoute: ActivatedRoute, private moviesService: MoviesService, private router: Router) { }

  ngOnInit(): void {
    this.activateRoute.params.subscribe(params => {
      this.moviesService.putGet(params.id).subscribe(putGetDto => {
        this.model = putGetDto.movie;

        this.selectedGenres = putGetDto.selectedGenres.map(genre => {
          return <multipleSelectorModel> {key: genre.id, value: genre.name}
        })

        this.nonSelectedGenres = putGetDto.nonSelectedGenres.map(genre => {
          return <multipleSelectorModel> {key: genre.id, value: genre.name}
        })
  
        this.selectedMovieTheaters = putGetDto.selectedMovieTheaters.map(movieTheater => {
          return <multipleSelectorModel> {key: movieTheater.id, value: movieTheater.name}
        })

        this.nonSelectedMovieTheaters = putGetDto.nonSelectedMovieTheaters.map(movieTheater => {
          return <multipleSelectorModel> {key: movieTheater.id, value: movieTheater.name}
        })

        this.selectedActors = putGetDto.actors;
      })
    })
  }

  saveChanges(movieCreationDto: movieCreationDto) {
    this.moviesService.edit(this.model.id, movieCreationDto).subscribe(() => {
      this.router.navigate(['/movies/' + this.model.id]);
    });
  }

}
