using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MoviesAPI.DTOs;
using MoviesAPI.Entities;
using MoviesAPI.Helpers;

namespace MoviesAPI.Controllers
{
    [Route("api/movies")]
    [ApiController]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    public class MoviesController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly IMapper _mapper;
        private readonly IFileStorageService _fileStorageService;
        private string container = "movies";
        private readonly UserManager<IdentityUser> _userManager;
        public MoviesController(ApplicationDbContext context, IMapper mapper, IFileStorageService fileStorageService, UserManager<IdentityUser> userManager)
        {
            _userManager = userManager;
            _fileStorageService = fileStorageService;
            _mapper = mapper;
            _context = context;
        }

        [HttpGet]
        [AllowAnonymous]
        public async Task<ActionResult<HomeDto>> Get()
        {
            var top = 6;
            var today = DateTime.Today;

            var upcomingReleases = await _context.Movies
                .Where(x => x.ReleaseDate > today)
                .OrderBy(x => x.ReleaseDate)
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
        [AllowAnonymous]
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

            var averageVote = 0.0;
            var userVote = 0;

            if (await _context.Ratings.AnyAsync(x => x.MovieId == id))
            {
                averageVote = await _context.Ratings.Where(x => x.MovieId == id).AverageAsync(x => x.Rate);

                if (HttpContext.User.Identity.IsAuthenticated)
                {
                    var email = HttpContext.User.Claims.FirstOrDefault(x => x.Type == "email").Value;
                    var user = await _userManager.FindByEmailAsync(email);
                    var userId = user.Id;

                    var ratingDb = await _context.Ratings.FirstOrDefaultAsync(x => x.MovieId == id && x.UserId == userId);

                    if (ratingDb != null)
                    {
                        userVote = ratingDb.Rate;
                    }
                }
            }

            var dto = _mapper.Map<MovieDto>(movie);
            dto.AverageVote = averageVote;
            dto.UserVote = userVote;
            dto.Actors = dto.Actors.OrderBy(x => x.Order).ToList();
            return dto;
        }

        [HttpGet("filter")]
        public async Task<ActionResult<List<MovieDto>>> Filter([FromQuery] FilterMoviesDto filterMoviesDto)
        {
            var moviesQueryable = _context.Movies.AsQueryable();

            if (!string.IsNullOrEmpty(filterMoviesDto.Title))
            {
                moviesQueryable = moviesQueryable.Where(x => x.Title.Contains(filterMoviesDto.Title));
            }

            if (filterMoviesDto.InTheaters)
            {
                moviesQueryable = moviesQueryable.Where(x => x.InTheaters);
            }

            if (filterMoviesDto.UpcomingReleases)
            {
                var today = DateTime.Today;
                moviesQueryable = moviesQueryable.Where(x => x.ReleaseDate > today);
            }

            if (filterMoviesDto.GenreId != 0)
            {
                moviesQueryable = moviesQueryable.Where(x => x.MoviesGenres.Select(y => y.GenreId).Contains(filterMoviesDto.GenreId));
            }

            await HttpContext.InsertParametersPaginationInHeader(moviesQueryable);
            var movies = await moviesQueryable.OrderBy(x => x.Title).Paginate(filterMoviesDto.PaginationDto).ToListAsync();

            return _mapper.Map<List<MovieDto>>(movies);

        }

        [HttpGet("PostGet")]
        public async Task<ActionResult<MoviePostGetDto>> PostGet()
        {
            var movieTheaters = await _context.MovieTheaters.ToListAsync();
            var genres = await _context.Genres.ToListAsync();

            var movieTheatersDto = _mapper.Map<List<MovieTheaterDto>>(movieTheaters);
            var genresDto = _mapper.Map<List<GenreDto>>(genres);

            return new MoviePostGetDto() { Genres = genresDto, MovieTheaters = movieTheatersDto };
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
            var nonSelectedMovieTheatersDto = _mapper.Map<List<MovieTheaterDto>>(nonSelectedMovieTheaters);

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

        [HttpDelete("{id:int}")]
        public async Task<ActionResult> Delete(int id)
        {
            var movie = await _context.Movies.FirstOrDefaultAsync(x => x.Id == id);

            if (movie == null)
            {
                return NotFound();
            }

            _context.Remove(movie);
            await _context.SaveChangesAsync();
            await _fileStorageService.DeleteFile(movie.Poster, container);

            return NoContent();
        }
    }
}