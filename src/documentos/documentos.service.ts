import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Documento } from 'src/entities/documento.entity';
import { CreateDocumentoDto } from './dto/create-documento.dto';
import { UpdateDocumentoDto } from './dto/update-documento.dto';

@Injectable()
export class DocumentosService {
  constructor(
    @InjectRepository(Documento) 
    private readonly documentoRepository: Repository<Documento>,
  ) {}
  async create(createDocumentoDto: CreateDocumentoDto): Promise<Documento> {
    const documento = this.documentoRepository.create(createDocumentoDto); 
    return this.documentoRepository.save(documento);
  }

  async findAll(): Promise<Documento[]>  {
    return this.documentoRepository.find();
  }

  async findOne(id: number): Promise<Documento> {
    const buscarDocumento = await this.documentoRepository.findOne({ where: { id } });
    if (!buscarDocumento) {
      throw new Error('Archivo no encontrado');
    }
    return buscarDocumento;
  }

  async update(id: number, updateDocumentoDto: UpdateDocumentoDto) {
    const documentoActualizado = await this.findOne(id)
    Object.assign(documentoActualizado, updateDocumentoDto);

    return this.documentoRepository.save(documentoActualizado);
  }

  async remove(id: number) {
    const comentarioBorrado = await this.findOne(id)
    return this.documentoRepository.delete(comentarioBorrado);
  }
}
