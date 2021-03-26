using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MoviesAPI.DTOs;
using MoviesAPI.Entities;

namespace MoviesAPI.Controllers
{
    [ApiController]
    [Route("api/ratings")]
    public class RatingsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly UserManager<IdentityUser> _userManager;
        public RatingsController(ApplicationDbContext context, UserManager<IdentityUser> userManager)
        {
            _userManager = userManager;
            _context = context;
        }

        [HttpPost]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public async Task<ActionResult> Post([FromBody] RatingDto ratingDto)
        {
            var email = HttpContext.User.Claims.FirstOrDefault(x => x.Type == "email").Value;
            var user = await _userManager.FindByEmailAsync(email);
            var userId = user.Id;

            var currentRate = await _context.Ratings.FirstOrDefaultAsync(x => x.MovieId == ratingDto.MovieId && x.UserId == userId);

            if (currentRate == null)
            {
                var rating = new Rating();
                rating.MovieId = ratingDto.MovieId;
                rating.Rate = ratingDto.Rating;
                rating.UserId = userId;
                _context.Add(rating);
            }
            else
            {
                currentRate.Rate = ratingDto.Rating;
            }

            await _context.SaveChangesAsync();
            
            return NoContent();
        }
    }
}