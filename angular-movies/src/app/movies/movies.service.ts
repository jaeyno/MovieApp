import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { formatDateFormData } from '../utilities/utils';
import { MoviePostGetDto, movieCreationDto, movieDto, homeDto } from './movies.model';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  private apiUrl = environment.apiUrl + '/movies';

  constructor(private http: HttpClient) { }

  public getHomePageMovies(): Observable<homeDto> {
    return this.http.get<homeDto>(this.apiUrl);
  }

  public getById(id: number): Observable<movieDto> {
    return this.http.get<movieDto>(`${this.apiUrl}/${id}`);
  }

  public postGet(): Observable<MoviePostGetDto> {
    return this.http.get<MoviePostGetDto>(`${this.apiUrl}/postget`);
  }

  public create(movieCreationDto: movieCreationDto)  {
    const formData = this.BuildFormData(movieCreationDto);
    return this.http.post(this.apiUrl, formData);
  }

  private BuildFormData(movie: movieCreationDto): FormData {
    const formData = new FormData();

    formData.append('title', movie.title);
    formData.append('summary', movie.summary);
    formData.append('trailer', movie.trailer);
    formData.append('inTheaters', String(movie.inTheaters));

    if (movie.releaseDate) {
      formData.append('releaseDate', formatDateFormData(movie.releaseDate));
    }

    if (movie.poster) {
      formData.append('poster', movie.poster);
    }

    formData.append('genresIds', JSON.stringify(movie.genresIds));
    formData.append('movieTheatersIds', JSON.stringify(movie.movieTheatersIds));
    formData.append('actors', JSON.stringify(movie.actors));

    return formData;
  }
}
