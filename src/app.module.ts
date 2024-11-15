import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProcesosModule } from './procesos/procesos.module';
import { ComentariosModule } from './comentarios/comentarios.module';
import { DocumentosModule } from './documentos/documentos.module';
import { AudienciaModule } from './audiencia/audiencia.module';

@Module({
  controllers: [AppController],
  providers: [AppService],
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',  
      host: '172.21.0.14',  
      port: 3306,
      username: 'root', 
      database: 'valbuena_abogados',
      password: 'toor',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      //entities: ['dist/**/**/*.entity{.ts,.js}'],
      synchronize: true,
      autoLoadEntities: true,
    }),
    AuthModule,
    ProcesosModule,
    ComentariosModule,
    DocumentosModule,
    AudienciaModule
  ],
})
export class AppModule {}
