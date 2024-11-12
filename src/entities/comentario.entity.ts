import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from './user.entity';
import { ProcesoLegal } from './proceso.entity';

@Entity('comentarios_proceso')
export class Comentario {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, user => user.comentarios)
  usuario: User;

  @ManyToOne(() => ProcesoLegal, proceso => proceso.comentarios)
  proceso: ProcesoLegal;

  @Column()
  observacion: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  fechaComentario: Date;
}
