import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RatingService {

  private apiURL = environment.apiUrl + "/ratings";

  constructor(private http: HttpClient) { }

  public rate(movieId: number, rating: number) {
    return this.http.post(this.apiURL, {movieId, rating});
  }

}
