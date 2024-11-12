import { Controller, Get, Post, Body, Patch, Param, Delete, UploadedFile, UseInterceptors, Res, BadRequestException } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
import { join } from 'path';
import { createReadStream } from 'fs';
import { DocumentosService } from './documentos.service';
import { CreateDocumentoDto } from './dto/create-documento.dto';
import { UpdateDocumentoDto } from './dto/update-documento.dto';

@Controller('documentos')
export class DocumentosController {
  constructor(private readonly documentosService: DocumentosService) { }

  @Post('upload') 
  @UseInterceptors(FileInterceptor('file')) 
  async uploadFile(@UploadedFile() file, @Body() createDocumentoDto: CreateDocumentoDto) { 
    if (!file) { 
      throw new BadRequestException('Invalid file type. Only PDF and Word documents are allowed.'); 
    } 
    createDocumentoDto.rutaArchivo = file.filename; 
    const documento = await this.documentosService.create(createDocumentoDto); 
    return { message: 'File uploaded successfully!', documento, }; }

  @Get('download/:filename') 
  downloadFile(@Param('filename') filename: string, @Res() res: Response) { 
    const file = createReadStream(join(__dirname, '..', 'archivos', filename)); 
    file.pipe(res); 
  }

  @Get()
  findAll() {
    return this.documentosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.documentosService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDocumentoDto: UpdateDocumentoDto) {
    return this.documentosService.update(+id, updateDocumentoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.documentosService.remove(+id);
  }
}
