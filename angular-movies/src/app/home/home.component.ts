import { MoviesService } from './../movies/movies.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  moviesInTheaters;
  moviesFutureReleases;

  constructor(private moviesService: MoviesService) { }

  ngOnInit(): void {
    this.moviesService.getHomePageMovies().subscribe(homeDto => {
      this.moviesFutureReleases = homeDto.upcomingReleases;
      this.moviesInTheaters = homeDto.inTheaters;
    })
  }

}
