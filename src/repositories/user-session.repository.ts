// src/auth/repositories/user-session.repository.ts
import { Repository } from 'typeorm';
import { UserSession } from '../entities/user-session.entity';

export class UserSessionRepository extends Repository<UserSession> {}
