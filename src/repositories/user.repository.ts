// src/repositories/user.repository.ts
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';

export class UserRepository extends Repository<User> {
  // Aquí puedes agregar métodos personalizados si es necesario
}
