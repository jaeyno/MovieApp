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
    [Route("api/actors")]
    [ApiController]
    public class ActorsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly IMapper _mapper;
        private readonly IFileStorageService _fileStorageService;
        private readonly string containerName = "actors";
        public ActorsController(ApplicationDbContext context, IMapper mapper, IFileStorageService fileStorageService)
        {
            _fileStorageService = fileStorageService;
            _mapper = mapper;
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<List<ActorDto>>> Get([FromQuery] PaginationDto paginationDto)
        {
            var queryable = _context.Actors.AsQueryable();
            await HttpContext.InsertParametersPaginationInHeader(queryable);
            var actors = await queryable.OrderBy(x => x.Name).Paginate(paginationDto).ToListAsync();
            return _mapper.Map<List<ActorDto>>(actors);
        }

        [HttpPost("searchByName")]
        public async Task<ActionResult<List<ActorsMovieDto>>> SearchByName([FromBody] string name)
        {
            if (string.IsNullOrWhiteSpace(name))
            {
                return new List<ActorsMovieDto>();
            }

            return await _context.Actors
                .Where(x => x.Name.Contains(name))
                .OrderBy(x => x.Name)
                .Select(x => new ActorsMovieDto { Id = x.Id, Name = x.Name, Picture = x.Picture})
                .Take(5)
                .ToListAsync();
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
        public async Task<ActionResult> Post([FromForm] ActorCreationDto actorCreationDto)
        {
            var actor = _mapper.Map<Actor>(actorCreationDto);

            if (actorCreationDto.Picture != null)
            {
                actor.Picture = await _fileStorageService.SaveFile(containerName, actorCreationDto.Picture);
            }

            _context.Add(actor);
            await _context.SaveChangesAsync();
            return NoContent();
        }

        [HttpPut("{id:int}")]
        public async Task<ActionResult> Put(int id, [FromForm] ActorCreationDto actorCreationDto)
        {
            var actor = await _context.Actors.FirstOrDefaultAsync(x => x.Id == id);

            if (actor == null)
            {
                return NotFound();
            }

            actor = _mapper.Map(actorCreationDto, actor);

            if (actorCreationDto.Picture != null)
            {
                actor.Picture = await _fileStorageService.EditFile(containerName, actorCreationDto.Picture, actor.Picture);
            }

            await _context.SaveChangesAsync();
            return NoContent();
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

            await _fileStorageService.DeleteFile(actor.Picture, containerName);

            return NoContent();
        }
    }
}