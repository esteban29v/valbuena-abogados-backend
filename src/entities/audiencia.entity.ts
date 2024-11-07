import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { ProcesoLegal } from './proceso.entity';

@Entity('audiencias')
export class Audiencia {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => ProcesoLegal, proceso => proceso.audiencias)
  proceso: ProcesoLegal;

  @Column({ type: 'timestamp' })
  fecha: Date;

  @Column()
  lugar: string;

  @Column({ nullable: true })
  resultado?: string;
}