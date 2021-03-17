using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using Microsoft.Extensions.Logging;
using MoviesAPI.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MoviesAPI.Controllers
{
    [Route("api/genres")]
    [ApiController]
    public class GenresController : ControllerBase
    {
        private readonly IRepository _repository;
        private readonly ILogger _logger;

        public GenresController(IRepository repository, ILogger logger)
        {
            _repository = repository;
            _logger = logger;
        }

        [HttpGet]
        public async Task<ActionResult<List<Genre>>> Get()
        {
            _logger.LogInformation("Getting all the genres");
            return await _repository.GetAllGenres();
        }
        
        [HttpGet("{Id:int}")]
        public ActionResult<Genre> Get(int Id, [FromHeader] string param2)
        {

            var genre = _repository.GetGenreById(Id);

            if (genre == null)
            {
                _logger.LogWarning($"Genre with Id {Id} not found");
                return NotFound();
            }

            return genre;
        }

        [HttpPost]
        public ActionResult Post([FromBody] Genre genre)
        {
            return NoContent();
        }

        [HttpPut]
        public ActionResult Put([FromBody] Genre genre)
        { 
            return NoContent();
        }

        [HttpDelete]
        public void Delete()
        {

        }
    }
}
