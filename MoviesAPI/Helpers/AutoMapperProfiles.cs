using System.Collections.Generic;
using AutoMapper;
using MoviesAPI.DTOs;
using MoviesAPI.Entities;
using NetTopologySuite.Geometries;

namespace MoviesAPI.Helpers
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles(GeometryFactory geometryFactory)
        {
            CreateMap<GenreDto, Genre>().ReverseMap();
            CreateMap<GenreCreationDto, Genre>();

            CreateMap<ActorDto, Actor>().ReverseMap();
            CreateMap<ActorCreationDto, Actor>().ForMember(x => x.Picture, options => options.Ignore());

            CreateMap<MovieTheater, MovieTheaterDto>()
                .ForMember(x => x.Latitude, dto => dto.MapFrom(prop => prop.Location.Y))
                .ForMember(x => x.Longitude, dto => dto.MapFrom(prop => prop.Location.X));

            CreateMap<MovieTheaterCreationDto, MovieTheater>()
                .ForMember(x => x.Location, x => x.MapFrom(dto => geometryFactory.CreatePoint(new Coordinate(dto.Longitude, dto.Latitude))));

            CreateMap<MovieCreationDto, Movie>()
                .ForMember(x => x.Poster, options => options.Ignore())
                .ForMember(x => x.MoviesGenres, options => options.MapFrom(MapMoviesGenres))
                .ForMember(x => x.MovieTheatersMovies, options => options.MapFrom(MapMovieTheatersMovies))
                .ForMember(x => x.MoviesActors, options => options.MapFrom(MapMoviesActors));
        }

        private List<MoviesGenres> MapMoviesGenres(MovieCreationDto movieCreationDto, Movie movie)
        {
            var result = new List<MoviesGenres>();

            if (movieCreationDto.GenresIds == null)
            {
                return result;
            }

            foreach (var id in movieCreationDto.GenresIds)
            {
                result.Add(new MoviesGenres() {GenreId = id});
            }

            return result;
        }

        private List<MovieTheatersMovies> MapMovieTheatersMovies(MovieCreationDto movieCreationDto, Movie movie)
        {
            var result = new List<MovieTheatersMovies>();

            if (movieCreationDto.MovieTheatersIds == null)
            {
                return result;
            }

            foreach (var id in movieCreationDto.MovieTheatersIds)
            {
                result.Add(new MovieTheatersMovies() {MovieTheaterId = id});
            }

            return result;
        }

        private List<MoviesActors> MapMoviesActors(MovieCreationDto movieCreationDto, Movie movie)
        {
            var result = new List<MoviesActors>();

            if (movieCreationDto.Actors == null)
            {
                return result;
            }

            foreach (var actor in movieCreationDto.Actors)
            {
                result.Add(new MoviesActors() {ActorId = actor.Id, Character = actor.Character});
            }

            return result;
        }
    }
}