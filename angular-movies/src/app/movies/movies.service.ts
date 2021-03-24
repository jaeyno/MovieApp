import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { formatDateFormData } from '../utilities/utils';
import { MoviePostGetDto, movieCreationDto, movieDto, homeDto, MoviePutGetDto } from './movies.model';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  private apiUrl = environment.apiUrl + '/movies';

  constructor(private http: HttpClient) { }

  public getHomePageMovies(): Observable<homeDto> {
    return this.http.get<homeDto>(this.apiUrl);
  }

  public putGet(id: number): Observable<MoviePutGetDto> {
    return this.http.get<MoviePutGetDto>(`${this.apiUrl}/putget/${id}`);
  }

  public edit(id: number, movieCreationDto: movieCreationDto) {
    const formData = this.BuildFormData(movieCreationDto);
    return this.http.put(`${this.apiUrl}/${id}`, formData);
  }

  public getById(id: number): Observable<movieDto> {
    return this.http.get<movieDto>(`${this.apiUrl}/${id}`);
  }

  public filter(values: any): Observable<any> {
    const params = new HttpParams({fromObject: values});
    return this.http.get<movieDto[]>(`${this.apiUrl}/filter`, {params, observe: 'response'});
  }

  public postGet(): Observable<MoviePostGetDto> {
    return this.http.get<MoviePostGetDto>(`${this.apiUrl}/postget`);
  }

  public create(movieCreationDto: movieCreationDto): Observable<number>  {
    const formData = this.BuildFormData(movieCreationDto);
    return this.http.post<number>(this.apiUrl, formData);
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
