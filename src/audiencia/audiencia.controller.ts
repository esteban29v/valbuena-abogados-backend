import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AudienciaService } from './audiencia.service';
import { CreateAudienciaDto } from './dto/create-audiencia.dto';
import { UpdateAudienciaDto } from './dto/update-audiencia.dto';

@Controller('audiencia')
export class AudienciaController {
  constructor(private readonly audienciaService: AudienciaService) {}

  @Post()
  create(@Body() createAudienciaDto: CreateAudienciaDto) {
    return this.audienciaService.create(createAudienciaDto);
  }

  @Get()
  findAll() {
    return this.audienciaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.audienciaService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAudienciaDto: UpdateAudienciaDto) {
    return this.audienciaService.update(+id, updateAudienciaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.audienciaService.remove(+id);
  }
}
