import { IsString, IsNotEmpty, IsObject } from 'class-validator';
export class CreateDocumentoDto {

    @IsObject()
    @IsNotEmpty()
    proceso: object;

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

