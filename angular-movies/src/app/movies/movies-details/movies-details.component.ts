import { RatingService } from './../../utilities/rating.service';
import { coordinatesMapWithMessage } from './../../utilities/map/coordinate';
import { ActivatedRoute } from '@angular/router';
import { MoviesService } from './../movies.service';
import { Component, OnInit } from '@angular/core';
import { movieDto } from '../movies.model';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-movies-details',
  templateUrl: './movies-details.component.html',
  styleUrls: ['./movies-details.component.css']
})
export class MoviesDetailsComponent implements OnInit {

  movie: movieDto;
  releaseDate: Date;
  trailerURL: SafeResourceUrl;
  coordinates: coordinatesMapWithMessage[] = [];

  constructor(private moviesService: MoviesService, private activatedRoute: ActivatedRoute, private sanitizer: DomSanitizer, private ratingService: RatingService) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.moviesService.getById(params.id).subscribe(movie => {
        this.movie = movie;
        this.releaseDate = new Date(movie.releaseDate);
        this.trailerURL = this.generateYoutubeURLForEmbeddedVideo(movie.trailer);
        this.coordinates = movie.movieTheaters.map(movieTheater => {
          return {latitude: movieTheater.latitude, longitude: movieTheater.longitude, message: movieTheater.name}
        })
      })
    })
  }

  generateYoutubeURLForEmbeddedVideo(url: any):SafeResourceUrl {
    
    if (!url) {
      return '';
    }

    //https://www.youtube.com/watch?v=YoHD9XEInc0
    let videoId = url.split('v=')[1];
    const ampersandPosition = videoId.indexOf('&');
    if (ampersandPosition !== -1) {
      videoId = videoId.substring(0, ampersandPosition);
    }

    return this.sanitizer.bypassSecurityTrustResourceUrl(`https://www.youtube.com/embed/${videoId}`);
  }

  onRating(rate: number) {
    this.ratingService.rate(this.movie.id, rate).subscribe(() => {
      Swal.fire("Success", "Your vote has been received", "success");
    });
  }
}
