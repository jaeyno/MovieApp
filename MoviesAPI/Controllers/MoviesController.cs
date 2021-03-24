using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MoviesAPI.DTOs;
using MoviesAPI.Entities;
using MoviesAPI.Helpers;

namespace MoviesAPI.Controllers
{
    [Route("api/movies")]
    [ApiController]
    public class MoviesController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly IMapper _mapper;
        private readonly IFileStorageService _fileStorageService;
        private string container = "movies";
        public MoviesController(ApplicationDbContext context, IMapper mapper, IFileStorageService fileStorageService)
        {
            _fileStorageService = fileStorageService;
            _mapper = mapper;
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<HomeDto>> Get()
        {
            var top = 6;
            var today = DateTime.Today;

            var upcomingReleases = await _context.Movies
                .Where(x => x.ReleaseDate > today)
                .OrderBy( x => x.ReleaseDate)
                .Take(top)
                .ToListAsync();

            var inTheaters = await _context.Movies
                .Where(x => x.InTheaters)
                .OrderBy(x => x.ReleaseDate)
                .Take(top)
                .ToListAsync();

            var homeDto = new HomeDto();
            homeDto.UpcomingReleases = _mapper.Map<List<MovieDto>>(upcomingReleases);
            homeDto.InTheaters = _mapper.Map<List<MovieDto>>(inTheaters);
            return homeDto;
        }

        [HttpGet("{id:int}")]
        public async Task<ActionResult<MovieDto>> Get(int id)
        {
            var movie = await _context.Movies
                .Include(x => x.MoviesGenres).ThenInclude(x => x.Genre)
                .Include(x => x.MovieTheatersMovies).ThenInclude(x => x.MovieTheater)
                .Include(x => x.MoviesActors).ThenInclude(x => x.Actor)
                .FirstOrDefaultAsync(x => x.Id == id);

            if (movie == null)
            {
                return NotFound();
            }

            var dto = _mapper.Map<MovieDto>(movie);
            dto.Actors = dto.Actors.OrderBy(x => x.Order).ToList();
            return dto;
        }

        [HttpGet("PostGet")]
        public async Task<ActionResult<MoviePostGetDto>> PostGet()
        {
            var movieTheaters = await _context.MovieTheaters.ToListAsync();
            var genres = await _context.Genres.ToListAsync();

            var movieTheatersDto = _mapper.Map<List<MovieTheaterDto>>(movieTheaters);
            var genresDto = _mapper.Map<List<GenreDto>>(genres);

            return new MoviePostGetDto() { Genres = genresDto, MovieTheaters = movieTheatersDto};
        }

        [HttpPost]
        public async Task<ActionResult<int>> Post([FromForm] MovieCreationDto movieCreationDto)
        {
            var movie = _mapper.Map<Movie>(movieCreationDto);

            if (movieCreationDto.Poster != null)
            {
                movie.Poster = await _fileStorageService.SaveFile(container, movieCreationDto.Poster);
            }

            AnnotateActorsOrder(movie);
            _context.Add(movie);
            await _context.SaveChangesAsync();
            return movie.Id;
        }

        [HttpGet("putget/{id:int}")]
        public async Task<ActionResult<MoviePutGetDto>> PutGet(int id)
        {
            var movieActionResult = await Get(id);

            if (movieActionResult.Result is NotFoundResult)
            {
                return NotFound();
            }

            var movie = movieActionResult.Value;

            var genresSelectedIds = movie.Genres.Select(x => x.Id).ToList();
            var nonSelectedGenres = await _context.Genres.Where(x => !genresSelectedIds.Contains(x.Id)).ToListAsync();

            var movieTheatersIds = movie.MovieTheaters.Select(x => x.Id).ToList();
            var nonSelectedMovieTheaters = await _context.MovieTheaters.Where(x => !movieTheatersIds.Contains(x.Id)).ToListAsync();

            var nonSelectedGenresDto = _mapper.Map<List<GenreDto>>(nonSelectedGenres);
            var nonSelectedMovieTheatersDto =_mapper.Map<List<MovieTheaterDto>>(nonSelectedMovieTheaters);

            var response = new MoviePutGetDto();
            response.Movie = movie;
            response.SelectedGenres = movie.Genres;
            response.NonSelectedGenres = nonSelectedGenresDto;
            response.SelectedMovieTheaters = movie.MovieTheaters;
            response.NonSelectedMovieTheaters = nonSelectedMovieTheatersDto;
            response.Actors = movie.Actors;

            return response;
        }

        [HttpPut("{id:int}")]
        public async Task<ActionResult> Put(int id, [FromForm] MovieCreationDto movieCreationDto)
        {
            var movie = await _context.Movies.Include(x => x.MoviesActors).Include(x => x.MoviesGenres).Include(x => x.MovieTheatersMovies)
                .FirstOrDefaultAsync(x => x.Id == id);
            
            if (movie == null)
            {
                return NotFound();
            }

            movie = _mapper.Map(movieCreationDto, movie);

            if (movieCreationDto.Poster != null)
            {
                movie.Poster = await _fileStorageService.EditFile(container, movieCreationDto.Poster, movie.Poster);
            }

            AnnotateActorsOrder(movie);
            await _context.SaveChangesAsync();
            return NoContent();
        }

        private void AnnotateActorsOrder(Movie movie)
        {
            if (movie.MoviesActors != null)
            {
                for (int i = 0; i < movie.MoviesActors.Count; i++)
                {
                    movie.MoviesActors[i].Order = i;
                }
            }
        }
    }
}