import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProcesosService } from './procesos.service';
import { CreateProcesoDto } from './dto/create-proceso.dto';
import { UpdateProcesoDto } from './dto/update-proceso.dto';

@Controller('procesos')
export class ProcesosController {
  constructor(private readonly procesosService: ProcesosService) {}

  @Post('admin/nuevo_proceso')
  create(@Body() createProcesoDto: CreateProcesoDto) {
    return this.procesosService.createProceso(createProcesoDto);
  }

  @Get('admin/ver_procesos')
  findAll() {
    return this.procesosService.findAll();
  }

  @Get('ver_proceso:id')
  findOne(@Param('id') id: string) {
    return this.procesosService.findOne(+id);
  }

  @Patch('actualizar_proceso:id')
  update(@Param('id') id: string, @Body() updateProcesoDto: UpdateProcesoDto) {
    return this.procesosService.update(+id, updateProcesoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.procesosService.remove(+id);
  }
}
