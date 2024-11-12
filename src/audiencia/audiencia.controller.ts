import { Controller, Get, Post, Body, Patch, Param, Delete, NotFoundException } from '@nestjs/common';
import { AudienciaService } from './audiencia.service';
import { CreateAudienciaDto } from './dto/create-audiencia.dto';
import { UpdateAudienciaDto } from './dto/update-audiencia.dto';
import { Audiencia } from 'src/entities/audiencia.entity';

@Controller('audiencia')
export class AudienciaController {
  constructor(private readonly audienciaService: AudienciaService) {}

  @Post()
  async create(@Body() createAudienciaDto: CreateAudienciaDto): Promise<Audiencia> {
    return this.audienciaService.create(createAudienciaDto);
  }

  @Get()
  async findAll(): Promise<Audiencia[]> {
    return this.audienciaService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Audiencia> {
    const audiencia = await this.audienciaService.findOne(+id);
    if (!audiencia) {
      throw new NotFoundException('Audiencia no encontrada');
    }
    return audiencia;
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateAudienciaDto: UpdateAudienciaDto): Promise<Audiencia> {
    const updatedAudiencia = await this.audienciaService.update(+id, updateAudienciaDto);
    if (!updatedAudiencia) {
      throw new NotFoundException('Audiencia no encontrada');
    }
    return updatedAudiencia;
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    const result = await this.audienciaService.remove(+id);
    if (!result) {
      throw new NotFoundException('Audiencia no encontrada');
    }
  }
}
