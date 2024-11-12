import { Controller, Get, Post, Body, Patch, Param, Delete, NotFoundException } from '@nestjs/common';
import { ProcesosService } from './procesos.service';
import { CreateProcesoDto } from './dto/create-proceso.dto';
import { UpdateProcesoDto } from './dto/update-proceso.dto';

@Controller('procesos')
export class ProcesosController {
  constructor(private readonly procesosService: ProcesosService) {}

  @Post('admin/nuevo_proceso')
  async create(@Body() createProcesoDto: CreateProcesoDto) {
    return this.procesosService.createProceso(createProcesoDto);
  }

  @Get('admin/ver_procesos')
  async findAll() {
    return this.procesosService.findAll();
  }

  @Get('ver_proceso/:id')
  async findOne(@Param('id') id: string) {
    const proceso = await this.procesosService.findOne(+id);
    if (!proceso) {
      throw new NotFoundException('Proceso no encontrado');
    }
    return proceso;
  }

  @Patch('actualizar_proceso/:id')
  async update(@Param('id') id: string, @Body() updateProcesoDto: UpdateProcesoDto) {
    const updatedProceso = await this.procesosService.update(+id, updateProcesoDto);
    if (!updatedProceso) {
      throw new NotFoundException('Proceso no encontrado');
    }
    return updatedProceso;
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const result = await this.procesosService.remove(+id);
    if (!result) {
      throw new NotFoundException('Proceso no encontrado');
    }
  }
}