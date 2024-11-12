import { Module } from '@nestjs/common';
import { ProcesosService } from './procesos.service';
import { ProcesosController } from './procesos.controller';
import { ProcesoLegal } from 'src/entities/proceso.entity';
import { ProcesoLegalRepository } from '../repositories/proceso.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ProcesoLegal]),
    AuthModule,
  ],
  controllers: [ProcesosController],
  providers: [ProcesosService, ProcesoLegalRepository],
  exports: [ProcesoLegalRepository], // Asegúrate de que esto esté presente
})
export class ProcesosModule {}