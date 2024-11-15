// auth.service.ts
import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '../entities/user.entity';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { access } from 'fs';
import { UserSession } from 'src/entities/user-session.entity';
import { UserSessionRepository } from '../repositories/user-session.repository';


@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(UserSession) private userSessionRepository: Repository<UserSession>,
  ) {}

  async createUser(userData: Partial<User>): Promise<any> {
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    const user = await this.userRepository.save({
      ...userData,
      password: hashedPassword,
      createdAt: new Date(),
    });

    const access_token = await this.authenticate(user);

    const session = new UserSession();
    session.user = user;
    session.access_token = access_token;
    session.is_valid = true;
    await this.userSessionRepository.save(session);

    return {user, access_token};
  }

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userRepository.findOne({ where: { email } });

    if (user && (await bcrypt.compare(password, user.password))) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async authenticate(user: any) {
    const payload = { email: user.email, sub: user.id };
    console.log('USER ID', user.id, payload)
    return this.jwtService.sign(payload);
  }

  async updateUser (id: number, userData: Partial<User>): Promise<User> {
    const user = await this.findUserById(id);
  
    
    if (userData.password) {
      userData.password = await bcrypt.hash(userData.password, 10);
    }
  
    // Actualizamos solo los campos que se han proporcionado
    await this.userRepository.update(id, {
      ...user,
      ...userData, 
    });
  
    return this.findUserById(id);
  }

  async findAllUsers(): Promise<User[]> {
    return this.userRepository.find();
  }

  async findUserById(id: number): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException(`User  with ID ${id} not found`);
    }
    return user;
  }

  async deleteUser (id: number): Promise<void> {
    const user = await this.findUserById(id);
    await this.userRepository.remove(user);
  }

  async logout(userId: number, accessToken: string) {
    const session = await this.userSessionRepository.findOne({
      where: { user: { id: userId }, access_token: accessToken },
    });

    //console.log(userId, session);

    if (!session) {
      throw new UnauthorizedException('Invalid session');
    }

    // Marca el token como inválido
    session.is_valid = false;
    await this.userSessionRepository.save(session);
  }
}
