import { MulterOptionsFactory, MulterModuleOptions } from '@nestjs/platform-express';
import * as multer from 'multer';
import { join } from 'path';

export class MulterConfigService implements MulterOptionsFactory {
  createMulterOptions(): MulterModuleOptions {
    return {
      storage: multer.diskStorage({
        destination: (req, file, cb) => {
          cb(null, join(__dirname, '..', 'archivos'));
        },
        filename: (req, file, cb) => {
          cb(null, `${Date.now()}-${file.originalname}`);
        },
      }),
      fileFilter: (req, file, cb) => {
        const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
        if (allowedTypes.includes(file.mimetype)) {
          cb(null, true);
        } else {
          cb(new Error('Formato inválido. Documentos PDF y WORD solamente permitidos.'), false);
        }
      },
    };
  }
}
