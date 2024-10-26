// auth.service.ts
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '../entities/user.entity';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { access } from 'fs';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async createUser(userData: Partial<User>): Promise<any> {
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    const user = await this.userRepository.save({
      ...userData,
      password: hashedPassword,
      createdAt: new Date(),
    });

    const access_token = await this.authenticate(user);

    return {user, access_token};
  }

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.userRepository.findOne({ where: { username } });

    if (user && (await bcrypt.compare(password, user.password))) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async authenticate(user: any) {
    const payload = { username: user.username, sub: user.userId };
    return this.jwtService.sign(payload);
  }
}
