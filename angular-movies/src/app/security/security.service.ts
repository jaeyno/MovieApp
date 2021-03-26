import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { authenticationResponse, userCredentials } from './security.models';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SecurityService {

  private apiURL = environment.apiUrl + "/accounts"

  constructor(private http: HttpClient) { }

  isAuthenticated(): boolean {
    return false;
  }

  getRole(): string {
    return '';
  }

  register(userCredentials: userCredentials): Observable<authenticationResponse> {
    return this.http.post<authenticationResponse>(this.apiURL + "/create", userCredentials);
  }
}
