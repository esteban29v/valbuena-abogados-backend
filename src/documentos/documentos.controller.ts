import { Controller, Get, Post, Body, Patch, Param, Delete, UploadedFile, UseInterceptors, Res, BadRequestException, NotFoundException } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
import { join } from 'path';
import { createReadStream,existsSync } from 'fs';
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
    const filePath = join(__dirname, '..', 'archivos', filename);
    
    if (!existsSync(filePath)) {
      throw new BadRequestException('File not found');
    }

    const file = createReadStream(filePath); 
    file.pipe(res)
  }

  @Get()
  async findAll() {
    return this.documentosService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const documento = await this.documentosService.findOne(+id);
    if (!documento) {
      throw new NotFoundException('Documento no encontrado');
    }
    return documento;
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateDocumentoDto: UpdateDocumentoDto) {
    const updatedDocumento = await this.documentosService.update(+id, updateDocumentoDto);
    if (!updatedDocumento) {
      throw new NotFoundException('Documento no encontrado');
    }
    return updatedDocumento;
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const result = await this.documentosService.remove(+id);
    if (!result) {
      throw new NotFoundException('Documento no encontrado');
    }
  }
}
