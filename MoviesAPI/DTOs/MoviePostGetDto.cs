using System.Collections.Generic;

namespace MoviesAPI.DTOs
{
    public class MoviePostGetDto
    {
        public List<GenreDto> Genres { get; set; }
        public List<MovieTheaterDto> MovieTheaters { get; set; }
    }
}