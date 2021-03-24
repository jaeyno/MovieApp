import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { formatDateFormData } from '../utilities/utils';
import { actorCreationDto, actorDto, actorsMovieDto } from './actors.model';

@Injectable({
  providedIn: 'root'
})
export class ActorsService {

  private apiUrl = environment.apiUrl + '/actors';

  constructor(private http: HttpClient) { }

  get(page: number, rescordsPerPage: number): Observable<any> {
    let params = new HttpParams();
    params = params.append('page', page.toString());
    params = params.append('recordsPerPage', rescordsPerPage.toString());
    return this.http.get<actorDto[]>(this.apiUrl, {observe: 'response', params});
  }

  getById(id: number): Observable<actorDto> {
    return this.http.get<actorDto>(`${this.apiUrl}/${id}`);
  }

  searchByName(name: string): Observable<actorsMovieDto[]> {
    const headers = new HttpHeaders('Content-Type: application/json');
    return this.http.post<actorsMovieDto[]>(`${this.apiUrl}/searchByName`, JSON.stringify(name), {headers});
  }

  create(actor: actorCreationDto) {
    const formData = this.buildFormData(actor);
    return this.http.post(this.apiUrl, formData);
  }

  edit(id: number, actor: actorCreationDto) {
    const formData = this.buildFormData(actor);
    return this.http.put(`${this.apiUrl}/${id}`, formData);
  }

  delete(id: number) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  private buildFormData(actor: actorCreationDto): FormData {
    const formData = new FormData();

    formData.append('name', actor.name);

    if (actor.biography){
      formData.append('biography', actor.biography);
    }

    if (actor.dateOfBirth){
      formData.append('dateOfBirth', formatDateFormData(actor.dateOfBirth));
    }

    if (actor.picture){
      formData.append('picture', actor.picture);
    }

    return formData;
  }
}
