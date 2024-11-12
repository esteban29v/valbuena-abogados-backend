import { IsString, IsNotEmpty, IsObject } from 'class-validator';
export class CreateComentarioDto {

  @IsObject()
  @IsNotEmpty()
  usuario: object; 

  @IsObject()
  @IsNotEmpty()
  proceso: object;

  @IsString()
  @IsNotEmpty()
  observacion: string;
}
