using AutoMapper;
using Backend.Models;
using Backend.Models.DTO;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MascotaController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly IMapper _mapper;
        public MascotaController(ApplicationDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<ActionResult> Get()
        {
            try
            {
                var listMascotas = await _context.Mascotas.ToListAsync();
                var listMascotasDTO = _mapper.Map<IEnumerable<MascotaDTO>>(listMascotas);
                return Ok(listMascotas);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpGet("{id}")]
        public async Task<ActionResult> Get(int id)
        {
            try
            {
                var mascota = await _context.Mascotas.FindAsync(id);
                if (mascota == null)
                {
                    return NotFound();
                }
                var mascotaDTO = _mapper.Map<MascotaDTO>(mascota);
                return Ok(mascota);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(int id)
        {
            try
            {
                var mascota = await _context.Mascotas.FindAsync(id);
                if (mascota == null)
                {
                    return NotFound();
                }
                _context.Mascotas.Remove(mascota);
                await _context.SaveChangesAsync();
                return Ok(mascota);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPost]
        public async Task<ActionResult> Post(MascotaDTO mascotaDTO)
        {
            try
            {
                var mascota = _mapper.Map<Mascota>(mascotaDTO);
                mascota.FechaCreacion = DateTime.Now;
                _context.Add(mascota);
                await _context.SaveChangesAsync();
                var mascotaItemDTO = _mapper.Map<MascotaDTO>(mascota);
                return CreatedAtAction("Get", new { id = mascota.Id }, mascota); // createdataction es 201
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPut("{id}")]
        public async Task <ActionResult> Put(int id, MascotaDTO mascotaDto)
        {
            try
            {
                var mascota = _mapper.Map<Mascota>(mascotaDto);
                if (id != mascota.Id)
                {
                    return BadRequest();
                }
                var mascotaItem = await _context.Mascotas.FindAsync(id);
                if (mascotaItem == null)
                {
                    return NotFound();
                }
                mascotaItem.Nombre = mascota.Nombre;
                mascotaItem.Raza = mascota.Raza;
                mascotaItem.Edad = mascota.Edad;
                mascotaItem.Peso = mascota.Peso;
                mascotaItem.Color = mascota.Color;
                await _context.SaveChangesAsync();

                return NoContent();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message); 
            }
        }
    }
}
