import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserRepository } from '../repositories/user.repository';
import { User } from '../entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UserSessionRepository } from '../repositories/user-session.repository';
import { UserSession } from '../entities/user-session.entity';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(User) private userRepository: UserRepository,
    @InjectRepository(UserSession) private userSessionRepository: UserSessionRepository // Inyecta el repositorio de sesiones
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: true,
      secretOrKey: process.env.JWT_SECRET || 'default_secret',
    });
  }

  async validate(payload: any): Promise<User> {
    // Verifica si la sesión asociada al token está marcada como inválida
    const session = await this.userSessionRepository.findOne({
      where: { user:{ id: payload.sub}, is_valid: true },
    });

    // Si no hay sesión válida o el token es inválido, lanzamos un UnauthorizedException
    if (!session) {
      throw new UnauthorizedException('Invalid or expired token');
    }

    // Si la sesión es válida, busca el usuario
    const user = await this.userRepository.findOne({ where: { id: payload.sub } });
    
    // Si no se encuentra al usuario, lanzamos una excepción
    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    return user; // Devuelve el usuario si es válido
  }
}
