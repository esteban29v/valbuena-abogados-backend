import { Controller, Get, Post, Body, Patch, Param, Delete, NotFoundException } from '@nestjs/common';
import { ComentariosService } from './comentarios.service';
import { CreateComentarioDto } from './dto/create-comentario.dto';
import { UpdateComentarioDto } from './dto/update-comentario.dto';

@Controller('comentarios')
export class ComentariosController {
  constructor(private readonly comentariosService: ComentariosService) {}

  @Post()
  async create(@Body() createComentarioDto: CreateComentarioDto) {
    return this.comentariosService.createComentario(createComentarioDto);
  }

  @Get()
  async findAll() {
    return this.comentariosService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const comentario = await this.comentariosService.findOne(+id);
    if (!comentario) {
      throw new NotFoundException('Comentario no encontrado');
    }
    return comentario;
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateComentarioDto: UpdateComentarioDto) {
    const updatedComentario = await this.comentariosService.updateComentario(+id, updateComentarioDto);
    if (!updatedComentario) {
      throw new NotFoundException('Comentario no encontrado');
    }
    return updatedComentario;
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const result = await this.comentariosService.removeComentario(+id);
    if (!result) {
      throw new NotFoundException('Comentario no encontrado');
    }
  }
}