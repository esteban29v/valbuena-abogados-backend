import { IsString, IsOptional } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import { CreateComentarioDto } from './create-comentario.dto';

export class UpdateComentarioDto extends PartialType(CreateComentarioDto) {
  @IsOptional()
  @IsString()
  observacion: string;
}
