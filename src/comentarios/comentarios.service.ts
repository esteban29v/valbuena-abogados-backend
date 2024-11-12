import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Comentario } from 'src/entities/comentario.entity';
import { CreateComentarioDto } from './dto/create-comentario.dto';
import { UpdateComentarioDto } from './dto/update-comentario.dto';
import { ProcesoLegal } from 'src/entities/proceso.entity';
import { ProcesoLegalRepository } from 'src/repositories/proceso.repository';
import { UserRepository } from 'src/repositories/user.repository';
import { ComentarioRepository } from 'src/repositories/comentario.repository';

@Injectable()
export class ComentariosService {
  constructor(
    @InjectRepository(Comentario)
    private ComentarioRepository: ComentarioRepository,
    @InjectRepository(ProcesoLegal)
    private procesosRepository: ProcesoLegalRepository, 
    @InjectRepository(UserRepository)
    private usersRepository: UserRepository
  ) {}
  async createComentario(createComentarioDto: CreateComentarioDto): Promise<Comentario> {
    const usuario = await this.usersRepository.findOne({ where: { id: createComentarioDto.usuarioId} });
    if (!usuario) {
      throw new NotFoundException('Abogado no encontrado');
    }

    const proceso = await this.procesosRepository.findOne({ where: { id: createComentarioDto.procesoId} });
    if (!proceso) {
      throw new NotFoundException('Proceso no encontrado');
    }

    const comentario = this.ComentarioRepository.create({
      ...createComentarioDto,
      usuario: usuario,
      proceso: proceso,
    });
    return await this.ComentarioRepository.save(comentario);
  }

  async findAll(): Promise<Comentario[]> {
    return this.ComentarioRepository.find();
  }

  async findOne(id: number): Promise<Comentario>{
    const buscarComentario = await this.ComentarioRepository.findOne({ where: { id } });
    if (!buscarComentario) {
      throw new Error('Comentario no encontrado');
    }
    return buscarComentario;
  }

  async updateComentario(id: number, updateComentarioDto: UpdateComentarioDto) {
    const comentarioActualizado = await this.findOne(id)
    Object.assign(comentarioActualizado, updateComentarioDto);

    return this.ComentarioRepository.save(comentarioActualizado);
  }

  async removeComentario(id: number) {
    const comentarioBorrado = await this.findOne(id)
    return this.ComentarioRepository.delete(comentarioBorrado);
  }
}
