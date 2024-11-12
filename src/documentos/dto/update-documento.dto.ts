import { IsString, IsOptional } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import { CreateDocumentoDto } from './create-documento.dto';

export class UpdateDocumentoDto extends PartialType(CreateDocumentoDto) {
    @IsString()
    @IsOptional()
    tipo: string;

    @IsString()
    @IsOptional()
    rutaArchivo: string;

    @IsString()
    @IsOptional()
    descripcion: string;
}
