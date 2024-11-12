import { Module } from '@nestjs/common';
import { ProcesosService } from './procesos.service';
import { ProcesosController } from './procesos.controller';
import { ProcesoLegal } from 'src/entities/proceso.entity';
import { ProcesoLegalRepository } from 'src/repositories/proceso.repository';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([ProcesoLegal])],
  controllers: [ProcesosController],
  providers: [ProcesosService, ProcesoLegalRepository],
})
export class ProcesosModule {}
