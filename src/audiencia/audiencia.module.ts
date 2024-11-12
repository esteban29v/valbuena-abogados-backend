import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Audiencia } from 'src/entities/audiencia.entity';
import { AudienciaRepository } from 'src/repositories/audiencia.repository';
import { AudienciaService } from './audiencia.service';
import { AudienciaController } from './audiencia.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([Audiencia]),
  ],
  controllers: [AudienciaController],
  providers: [AudienciaService, AudienciaRepository],
})
export class AudienciaModule {}
