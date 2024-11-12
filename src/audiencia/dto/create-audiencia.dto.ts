import { IsString, IsNotEmpty, IsNumber, IsDate } from 'class-validator';
export class CreateAudienciaDto {

    @IsNumber()
    @IsNotEmpty()
    procesoId: number;

    @IsDate()
    @IsNotEmpty()
    fecha: Date;

    @IsString()
    @IsNotEmpty()
    lugar: string;
}
