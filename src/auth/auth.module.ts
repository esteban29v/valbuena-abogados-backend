import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { User } from '../entities/user.entity';
import { UserRepository } from '../repositories/user.repository';
import { JwtStrategy } from './jwt.strategy'; // Importa la estrategia JWT
import { JwtAuthGuard } from './jwt-auth.guard'; // Importa el guardia JWT

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'default_secret', // Cambia esto a un secreto más seguro en producción
      signOptions: { expiresIn: '60s' }, // Define el tiempo de expiración del token
    }),
    TypeOrmModule.forFeature([User])
  ],
  providers: [AuthService, UserRepository, JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
