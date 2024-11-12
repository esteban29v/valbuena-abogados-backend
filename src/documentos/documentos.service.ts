import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Documento } from 'src/entities/documento.entity';
import { CreateDocumentoDto } from './dto/create-documento.dto';
import { UpdateDocumentoDto } from './dto/update-documento.dto';
import { ProcesoLegal } from 'src/entities/proceso.entity';
import { ProcesoLegalRepository } from 'src/repositories/proceso.repository';
import { DocumentoRepository } from 'src/repositories/documento.repository';

@Injectable()
export class DocumentosService {
  constructor(
    @InjectRepository(Documento) 
    private readonly documentoRepository: DocumentoRepository,
    private procesosRepository: ProcesoLegalRepository 
  ) {}
  async create(createDocumentoDto: CreateDocumentoDto): Promise<Documento> {
    const ingresado = await this.documentoRepository.findOne({where: {rutaArchivo: createDocumentoDto.rutaArchivo}})

    if (ingresado) {
      throw new ConflictException('El documento ya existe');
    }

    const proceso = await this.procesosRepository.findOne({ where: { id: createDocumentoDto.procesoId } })
    if (!proceso) {
      throw new NotFoundException('Proceso no encontrado');
    }
    const documento = this.documentoRepository.create({
      ...createDocumentoDto,
      proceso: proceso,
    }); 
    return this.documentoRepository.save(documento);
  }

  async findAll(): Promise<Documento[]>  {
    return this.documentoRepository.find();
  }

  async findOne(id: number): Promise<Documento> {
    const buscarDocumento = await this.documentoRepository.findOne({ where: { id } });
    if (!buscarDocumento) {
      throw new NotFoundException('Archivo no encontrado');
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
