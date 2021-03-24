import { movieTheatersDto, movieTheatersCreationDto } from './movie-theaters.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { movieCreationDto } from '../movies/movies.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MovieTheatersService {

  constructor(private http: HttpClient) { }

  private apiUrl = environment.apiUrl + '/movieTheaters';

  public get(): Observable<movieTheatersDto[]> {
    return this.http.get<movieTheatersDto[]>(this.apiUrl);
  }

  public getById(id: number): Observable<movieTheatersDto> {
    return this.http.get<movieTheatersDto>(`${this.apiUrl}/${id}`);
  }

  public create(movieTheatersDto: movieTheatersCreationDto) {
    return this.http.post(this.apiUrl, movieTheatersDto);
  }

  public edit(id: number, movieTheatersDto: movieTheatersCreationDto) {
    return this.http.put(`${this.apiUrl}/${id}`, movieTheatersDto);
  }

  public delete(id: number) {
    return this.http.delete(`${this.apiUrl}/${id}`)
  }
}
