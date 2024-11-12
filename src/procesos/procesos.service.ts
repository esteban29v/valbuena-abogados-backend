import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProcesoLegal } from '../entities/proceso.entity';
import { CreateProcesoDto } from './dto/create-proceso.dto';
import { UpdateProcesoDto } from './dto/update-proceso.dto';
import { UserRepository } from 'src/repositories/user.repository';
import { ProcesoLegalRepository } from 'src/repositories/proceso.repository';

@Injectable()
export class ProcesosService {
  constructor(
    @InjectRepository(ProcesoLegal)
    private procesosRepository: ProcesoLegalRepository, 
    @InjectRepository(UserRepository)
    private usersRepository: UserRepository
  ) {}
  async createProceso(createProcesoDto: CreateProcesoDto): Promise<ProcesoLegal> {
    const registrado = await this.procesosRepository.findOne({ where: { numeroProceso: createProcesoDto.numeroProceso } });

    if (registrado) {
      throw new ConflictException('El número de proceso ya existe');
    }

    const abogado = await this.usersRepository.findOne({ where: { id: createProcesoDto.abogadoAsignadoId } });
    if (!abogado) {
      throw new NotFoundException('Abogado no encontrado');
    }
    const procesoLegal = this.procesosRepository.create({
      ...createProcesoDto,
      abogadoAsignado: abogado,
      
    });
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

    if (updateProcesoDto.abogadoAsignadoId) {
      const nuevoAbogado = await this.usersRepository.findOne({ where: { id: updateProcesoDto.abogadoAsignadoId } });
      if (!nuevoAbogado) {
        throw new NotFoundException('Abogado no encontrado');
      }

      procesoActualizado.abogadoAsignado = nuevoAbogado;
    }
    Object.assign(procesoActualizado, updateProcesoDto);
    return await this.procesosRepository.save(procesoActualizado);
  }

  async remove(id: number) {
    return `This action removes a #${id} proceso`;
  }
}
