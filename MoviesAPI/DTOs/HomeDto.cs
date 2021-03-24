using System.Collections.Generic;

namespace MoviesAPI.DTOs
{
    public class HomeDto
    {
        public List<MovieDto> InTheaters { get; set; }
        public List<MovieDto> UpcomingReleases { get; set; }
    }
}