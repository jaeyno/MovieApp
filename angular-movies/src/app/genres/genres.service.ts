import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { genreDto } from './genres.model';

@Injectable({
  providedIn: 'root'
})
export class GenresService {

  constructor(private http: HttpClient) { }

  private apiUrl = environment.apiUrl + '/genres'

  getAll(): Observable<genreDto[]> {
    return this.http.get<genreDto[]> (this.apiUrl);
  }
}
