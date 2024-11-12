import { IsString, IsNotEmpty, IsNumber } from 'class-validator';
export class CreateComentarioDto {

  @IsNumber()
  @IsNotEmpty()
  usuarioId: number; 

  @IsNumber()
  @IsNotEmpty()
  procesoId: number;

  @IsString()
  @IsNotEmpty()
  observacion: string;
}
