import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity('sensor_solo')
export class SensorSoloEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'float', nullable: true })
  nitrogenio: number;

  @Column({ type: 'float', nullable: true })
  potassio: number;

  @Column({ type: 'float', nullable: true })
  fosforo: number;

  @Column({ type: 'float', nullable: true })
  umidade: number;

  @Column({ type: 'float', nullable: true })
  temperatura: number;

  @Column({ type: 'float', nullable: true })
  ph: number;

  @CreateDateColumn({ name: 'data_chegada' })
  dataChegada: Date;
}
