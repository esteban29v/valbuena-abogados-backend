import { IsString, IsOptional, IsNumber, IsEnum } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import { CreateProcesoDto } from './create-proceso.dto';
import { EtapaProceso, EtapasProceso } from '../etapas/etapa';

export class UpdateProcesoDto extends PartialType(CreateProcesoDto) {
  @IsOptional()
  @IsString()
  tipo?: string;

  @IsOptional()
  @IsString()
  numeroProceso?: string;

  @IsOptional()
  @IsString()
  demandante?: string;

  @IsOptional()
  @IsString()
  demandado?: string;

  @IsOptional()
  @IsString()
  estado?: string;

  @IsOptional()
  @IsNumber()
  abogadoAsignadoId?: number;

  @IsOptional()
  @IsString()
  descripcion?: string;

  @IsOptional()
  @IsEnum(EtapasProceso) // Asegúrate de que el campo sea un valor de EtapaProceso
  etapa?: EtapaProceso;
}
