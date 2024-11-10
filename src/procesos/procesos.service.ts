import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProcesoLegal } from '../entities/proceso.entity';
import { CreateProcesoDto } from './dto/create-proceso.dto';
import { UpdateProcesoDto } from './dto/update-proceso.dto';

@Injectable()
export class ProcesosService {
  constructor(
    @InjectRepository(ProcesoLegal)
    private procesosRepository: Repository<ProcesoLegal>,
  ) {}
  async createProceso(createProcesoDto: CreateProcesoDto): Promise<ProcesoLegal> {
    const procesoLegal = this.procesosRepository.create(createProcesoDto);
    return await this.procesosRepository.save(procesoLegal);
  }

  async findAll(): Promise<ProcesoLegal[]>{
    return this.procesosRepository.find();
  }

  async findOne(id: number): Promise<ProcesoLegal>{
    const proceso = await this.procesosRepository.findOne({ where: { id } });
    if (!proceso) {
      throw new Error('Proceso no encontrado');
    }
    return proceso;
  }

  async update(id: number, updateProcesoDto: UpdateProcesoDto): Promise<ProcesoLegal>{
    const proceso = await this.findOne(id)
    Object.assign(proceso, updateProcesoDto);

    return this.procesosRepository.save(proceso);
  }

  async remove(id: number) {
    return `This action removes a #${id} proceso`;
  }
}
