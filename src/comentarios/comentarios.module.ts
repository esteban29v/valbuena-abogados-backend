import { Module } from '@nestjs/common';
import { ComentariosService } from './comentarios.service';
import { ComentariosController } from './comentarios.controller';
import { Comentario } from 'src/entities/comentario.entity';
import { ComentarioRepository } from 'src/repositories/comentario.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { ProcesosModule } from 'src/procesos/procesos.module';


@Module({
  imports: [TypeOrmModule.forFeature([Comentario]), AuthModule, ProcesosModule],
  controllers: [ComentariosController],
  providers: [ComentariosService, ComentarioRepository],
  exports: [ComentarioRepository]
})
export class ComentariosModule {}
