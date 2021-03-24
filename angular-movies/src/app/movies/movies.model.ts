import { actorsMovieDto } from './../actors/actors.model';
import { movieTheatersDto } from './../movie-theaters/movie-theaters.model';
import { genreDto } from './../genres/genres.model';
export interface movieCreationDto {
    title: string;
    summary: string;
    poster: File;
    inTheaters: boolean;
    releaseDate: Date;
    trailer: string;
    genresIds: number[];
    movieTheatersIds: number[];
    actors: actorsMovieDto[];
}

export interface movieDto {
    title: string;
    summary: string;
    poster: string;
    inTheaters: boolean;
    releaseDate: Date;
    trailer: string;
    genres: genreDto[];
    movieTheaters: movieTheatersDto[];
    actors: actorsMovieDto[];
}

export interface MoviePostGetDto {
    genres: genreDto[];
    movieTheaters: movieTheatersDto[];
}

export interface homeDto {
    inTheaters: movieDto[];
    upcomingReleases: movieDto[];
}