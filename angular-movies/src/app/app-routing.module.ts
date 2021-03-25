import { LoginComponent } from './security/login/login.component';
import { IsAdminGuard } from './is-admin.guard';
import { MoviesDetailsComponent } from './movies/movies-details/movies-details.component';
import { MovieFilterComponent } from './movies/movie-filter/movie-filter.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateActorComponent } from './actors/create-actor/create-actor.component';
import { EditActorComponent } from './actors/edit-actor/edit-actor.component';
import { IndexActorsComponent } from './actors/index-actors/index-actors.component';
import { CreateGenreComponent } from './genres/create-genre/create-genre.component';
import { EditGenreComponent } from './genres/edit-genre/edit-genre.component';
import { IndexGenresComponent } from './genres/index-genres/index-genres.component';
import { HomeComponent } from './home/home.component';
import { CreateMovieTheaterComponent } from './movie-theaters/create-movie-theater/create-movie-theater.component';
import { EditMovietheaterComponent } from './movie-theaters/edit-movietheater/edit-movietheater.component';
import { IndexMovieTheaterComponent } from './movie-theaters/index-movie-theater/index-movie-theater.component';
import { CreateMovieComponent } from './movies/create-movie/create-movie.component';
import { EditMovieComponent } from './movies/edit-movie/edit-movie.component';

const routes: Routes = [
  {path: '', component: HomeComponent},

  {path: 'genres', component: IndexGenresComponent, canActivate: [IsAdminGuard]},
  {path: 'genres/create', component: CreateGenreComponent, canActivate: [IsAdminGuard]},
  {path: 'genres/edit/:id', component: EditGenreComponent, canActivate: [IsAdminGuard]},

  {path: 'actors', component: IndexActorsComponent, canActivate: [IsAdminGuard]},
  {path: 'actors/create', component: CreateActorComponent, canActivate: [IsAdminGuard]},
  {path: 'actors/edit/:id', component: EditActorComponent, canActivate: [IsAdminGuard]},

  {path: 'movietheaters', component: IndexMovieTheaterComponent, canActivate: [IsAdminGuard]},
  {path: 'movietheaters/create', component: CreateMovieTheaterComponent, canActivate: [IsAdminGuard]},
  {path: 'movietheaters/edit/:id', component: EditMovietheaterComponent, canActivate: [IsAdminGuard]},

  {path: 'movies/create', component: CreateMovieComponent, canActivate: [IsAdminGuard]},
  {path: 'movies/edit/:id', component: EditMovieComponent, canActivate: [IsAdminGuard]},
  {path: 'movies/filter', component: MovieFilterComponent},
  {path: 'movies/:id', component: MoviesDetailsComponent},

  {path: 'login', component: LoginComponent},

  {path: '**', redirectTo: ''},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
