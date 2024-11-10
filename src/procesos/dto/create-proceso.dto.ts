import { IsString, IsNotEmpty, IsObject } from 'class-validator';

export class CreateProcesoDto {
  @IsString()
  @IsNotEmpty()
  tipo: string;

  @IsString()
  @IsNotEmpty()
  numeroProceso: string;

  @IsString()
  @IsNotEmpty()
  demandante: string;

  @IsString()
  @IsNotEmpty()
  demandado: string;

  @IsString()
  @IsNotEmpty()
  estado: string;

  @IsObject()
  @IsNotEmpty()
  abogadoAsignado: object;

  @IsNotEmpty()
  descripcion?: string;
}