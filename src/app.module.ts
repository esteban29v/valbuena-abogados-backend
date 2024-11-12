import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProcesosModule } from './procesos/procesos.module';
import { ComentariosModule } from './comentarios/comentarios.module';
import { DocumentosModule } from './documentos/documentos.module';

@Module({
  controllers: [AppController],
  providers: [AppService],
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',  
      host: 'localhost',  
      port: 3306,
      username: 'root', 
      database: 'valbuena_abogados',  
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    AuthModule,
    ProcesosModule,
    ComentariosModule,
    DocumentosModule
  ],
})
export class AppModule {}
