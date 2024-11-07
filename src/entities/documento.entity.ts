import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { ProcesoLegal } from './proceso.entity';

@Entity('documentos')
export class Documento {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => ProcesoLegal, proceso => proceso.documentos)
  proceso: ProcesoLegal;

  @Column()
  tipo: string; // Ej. 'Demanda', 'Respuesta', 'Prueba', etc.

  @Column()
  rutaArchivo: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  fechaSubida: Date;

  @Column({ nullable: true })
  descripcion?: string;
}