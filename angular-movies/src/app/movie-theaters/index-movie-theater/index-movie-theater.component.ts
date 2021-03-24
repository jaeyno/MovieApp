import { MovieTheatersService } from './../movie-theaters.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-index-movie-theater',
  templateUrl: './index-movie-theater.component.html',
  styleUrls: ['./index-movie-theater.component.css']
})
export class IndexMovieTheaterComponent implements OnInit {

  movieTheaters;
  displayColumns = ['name', 'actions']

  constructor(private movieTheatersService: MovieTheatersService) { }

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.movieTheatersService.get().subscribe(movieTheaters => this.movieTheaters = movieTheaters);
  }

  delete(id: number) {
    this.movieTheatersService.delete(id).subscribe(() => {
      this.loadData();
    })
  }

}
