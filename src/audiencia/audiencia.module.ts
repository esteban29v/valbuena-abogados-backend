import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Audiencia } from 'src/entities/audiencia.entity';
import { AudienciaRepository } from 'src/repositories/audiencia.repository';
import { AudienciaService } from './audiencia.service';
import { AudienciaController } from './audiencia.controller';
import { ProcesosModule } from '../procesos/procesos.module';

@Module({
  imports: [TypeOrmModule.forFeature([Audiencia]),ProcesosModule],
  controllers: [AudienciaController],
  providers: [AudienciaService, AudienciaRepository],
  exports: [AudienciaRepository]
})
export class AudienciaModule {}
