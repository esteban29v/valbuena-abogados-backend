import { IsString, IsNotEmpty, IsNumber } from 'class-validator';

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

  @IsNumber()
  @IsNotEmpty()
  abogadoAsignadoId: number;

  @IsNotEmpty()
  descripcion?: string;
}