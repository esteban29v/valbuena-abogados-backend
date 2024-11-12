import { IsString, IsOptional, IsDate } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import { CreateAudienciaDto } from './create-audiencia.dto';

export class UpdateAudienciaDto extends PartialType(CreateAudienciaDto) {

    @IsDate()
    @IsOptional()
    fecha: Date;

    @IsString()
    @IsOptional()
    lugar: string;

    @IsString()
    @IsOptional()
    resultado: string;
}
