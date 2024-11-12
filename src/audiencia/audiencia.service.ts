import { Injectable ,ConflictException, NotFoundException} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm'
import { Audiencia } from 'src/entities/audiencia.entity';
import { ProcesoLegal } from '../entities/proceso.entity';
import { CreateAudienciaDto } from './dto/create-audiencia.dto';
import { UpdateAudienciaDto } from './dto/update-audiencia.dto';
import { ProcesoLegalRepository } from '../repositories/proceso.repository';
import { AudienciaRepository } from 'src/repositories/audiencia.repository';

@Injectable()
export class AudienciaService {
  constructor(
    @InjectRepository(Audiencia)
    private audienciaRepository: AudienciaRepository,
    private procesosRepository: ProcesoLegalRepository,
  ) {}
  async create(createAudienciaDto: CreateAudienciaDto) {

    const proceso = await this.procesosRepository.findOne({where: {id: createAudienciaDto.procesoId}})
    if (!proceso) {
      throw new NotFoundException('Proceso no encontrado');
    }
    
    const audienciaExistente = await this.audienciaRepository.findOne({
      where: {
        fecha: createAudienciaDto.fecha,
        lugar: createAudienciaDto.lugar,
        proceso: proceso,
      },
    });
  
    if (audienciaExistente) {
      throw new ConflictException('La audiencia ya existe para esta fecha y lugar.');
    }

    const audiencia = await this.audienciaRepository.create({
      ...createAudienciaDto,
      proceso: proceso,
    })

    return this.audienciaRepository.save(audiencia);
  }

  async findAll() {
    return this.audienciaRepository.find();
  }
  
  async findOne(id: number) {
    const audiencia = await this.audienciaRepository.findOne({ where: { id }});
    if (!audiencia) {
      throw new NotFoundException('Audiencia no encontrada');
    }
    return audiencia;
  }
  
  async update(id: number, updateAudienciaDto: UpdateAudienciaDto) {
    const audiencia = await this.findOne(id); 
    Object.assign(audiencia, updateAudienciaDto);
    return this.audienciaRepository.save(audiencia);
  }
  
  async remove(id: number) {
    const audiencia = await this.findOne(id); 
    return this.audienciaRepository.remove(audiencia);
  }
}
