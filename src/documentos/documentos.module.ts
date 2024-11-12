import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DocumentosController } from './documentos.controller';
import { Documento } from 'src/entities/documento.entity';
import { DocumentosService } from './documentos.service';
import { MulterModule } from '@nestjs/platform-express';
import { MulterConfigService } from './multer.config';
import { DocumentoRepository } from 'src/repositories/documento.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([Documento]),
    MulterModule.registerAsync({
      useClass: MulterConfigService,
    }),
  ],
  controllers: [DocumentosController],
  providers: [DocumentosService, DocumentoRepository],
})
export class DocumentosModule {}

