import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comentario } from 'src/entities/comentario.entity';
import { CreateComentarioDto } from './dto/create-comentario.dto';
import { UpdateComentarioDto } from './dto/update-comentario.dto';

@Injectable()
export class ComentariosService {
  constructor(
    @InjectRepository(Comentario)
    private ComentarioRepository: Repository<Comentario>,
  ) {}
  async createComentario(createComentarioDto: CreateComentarioDto): Promise<Comentario> {

    const comentario = this.ComentarioRepository.create(createComentarioDto);
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

  async update(id: number, updateComentarioDto: UpdateComentarioDto) {
    const comentarioActualizado = await this.findOne(id)
    Object.assign(comentarioActualizado, updateComentarioDto);

    return this.ComentarioRepository.save(comentarioActualizado);
  }

  remove(id: number) {
    return `This action removes a #${id} comentario`;
  }
}
