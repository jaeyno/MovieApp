using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MoviesAPI.DTOs;

namespace MoviesAPI.Controllers
{
    [Route("api/actors")]
    [ApiController]
    public class ActorsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly IMapper _mapper;
        public ActorsController(ApplicationDbContext context, IMapper mapper)
        {
            _mapper = mapper;
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<List<ActorDto>>> Get()
        {
            var actors = await _context.Actors.ToListAsync();
            return _mapper.Map<List<ActorDto>>(actors);
        }

        [HttpGet("{id:int}")]
        public async Task<ActionResult<ActorDto>> GetById(int id)
        {
            var actor = await _context.Actors.SingleOrDefaultAsync(x => x.Id == id);

            if (actor == null)
            {
                return NotFound();
            }

            return _mapper.Map<ActorDto>(actor);
        }

        [HttpPost]
        public async Task<ActionResult> Post([FromBody] ActorCreationDto actorCreationDto)
        {
            throw new NotImplementedException();
        }

        [HttpPut]
        public async Task<ActionResult> Put([FromBody] ActorCreationDto actorCreationDto)
        {
            throw new NotImplementedException();
        }

        [HttpDelete("{id:int}")]
        public async Task<ActionResult> Delete(int id)
        {
            var actor = await _context.Actors.SingleOrDefaultAsync(x => x.Id == id);

            if (actor == null)
            {
                return NotFound();
            }

            _context.Remove(actor);
            await _context.SaveChangesAsync();
            
            return NoContent();
        }
    }
}