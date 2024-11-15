import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { ProcesoLegal } from './proceso.entity';
import { Comentario } from './comentario.entity';
import { UserSession } from './user-session.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  firstName?: string;

  @Column({ nullable: true })
  lastName?: string;

  @Column({ default: true })
  isActive: boolean;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'timestamp', nullable: true })
  updatedAt?: Date;

  @OneToMany(() => ProcesoLegal, proceso => proceso.abogadoAsignado)
  procesosLegales?: ProcesoLegal[];

  @OneToMany(() => Comentario, comentario => comentario.usuario)
  comentarios?: Comentario[];

  @OneToMany(() => UserSession, (userSession) => userSession.user)  // Relación uno a muchos
  sessions: UserSession[];
}
