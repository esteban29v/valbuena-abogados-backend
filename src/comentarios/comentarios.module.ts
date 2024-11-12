import { Module } from '@nestjs/common';
import { ComentariosService } from './comentarios.service';
import { ComentariosController } from './comentarios.controller';
import { Comentario } from 'src/entities/comentario.entity';
import { ComentarioRepository } from 'src/repositories/comentario.repository';
import { TypeOrmModule } from '@nestjs/typeorm';


@Module({
  imports: [TypeOrmModule.forFeature([Comentario])],
  controllers: [ComentariosController],
  providers: [ComentariosService, ComentarioRepository],
})
export class ComentariosModule {}
