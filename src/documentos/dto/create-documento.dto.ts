import { IsString, IsNotEmpty, IsNumber } from 'class-validator';
export class CreateDocumentoDto {

    @IsNumber()
    @IsNotEmpty()
    procesoId: number;

    @IsString()
    @IsNotEmpty()
    tipo: string;

    @IsString()
    @IsNotEmpty()
    rutaArchivo: string;

    @IsString()
    @IsNotEmpty()
    descripcion: string;
}

