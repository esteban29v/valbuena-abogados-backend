import { Injectable, ConflictException } from '@nestjs/common';
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
    const registrado = await this.procesosRepository.findOne({ where: { numeroProceso: createProcesoDto.numeroProceso } });

    if (registrado) {
      throw new ConflictException('El número de proceso ya existe'); // Lanza un error si ya existe
    }
    const procesoLegal = this.procesosRepository.create(createProcesoDto);
    return await this.procesosRepository.save(procesoLegal);
  }

  async findAll(): Promise<ProcesoLegal[]>{
    return await this.procesosRepository.find();
  }

  async findOne(id: number): Promise<ProcesoLegal>{
    const procesoBuscado = await this.procesosRepository.findOne({ where: { id } });
    if (!procesoBuscado) {
      throw new Error('Proceso no encontrado');
    }
    return procesoBuscado;
  }

  async update(id: number, updateProcesoDto: UpdateProcesoDto): Promise<ProcesoLegal>{
    const procesoActualizado = await this.findOne(id)
    Object.assign(procesoActualizado, updateProcesoDto);

    return this.procesosRepository.save(procesoActualizado);
  }

  async remove(id: number) {
    return `This action removes a #${id} proceso`;
  }
}
