import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { ProcesoLegal } from './proceso.entity';

@Entity('notificaciones')
export class Notificacion {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => ProcesoLegal, proceso => proceso.notificaciones)
  proceso: ProcesoLegal;

  @Column()
  tipo: string; // Ej. 'Notificación de demanda', 'Notificación de audiencia'

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  fecha: Date;

  @Column()
  contenido: string; // Texto de la notificación
}