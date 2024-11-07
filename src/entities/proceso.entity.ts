import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany} from 'typeorm';
import { User } from '../entities/user.entity';
import { Documento } from './documento.entity';
import { Audiencia } from './audiencia.entity';
import { Notificacion } from './notificacion.entity';

@Entity('procesos_legales')
export class ProcesoLegal {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  tipo: string;

  @Column({unique:true})
  numeroProceso: string;

  @ManyToOne(() => User, user => user.procesosLegales)
  abogadoAsignado: User;

  @Column()
  demandante: String;

  @Column()
  demandado: String;

  @Column()
  estado: string;

  @OneToMany(() => Documento, documento => documento.proceso)
  documentos: Documento[];

  @OneToMany(() => Audiencia, audiencia => audiencia.proceso)
  audiencias: Audiencia[];

  @OneToMany(() => Notificacion, notificacion => notificacion.proceso)
  notificaciones: Notificacion[];

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  fechaCreacion: Date;

  @Column({ type: 'timestamp', nullable: true })
  fechaCierre?: Date;

  @Column({ nullable: true })
  descripcion?: string;
}