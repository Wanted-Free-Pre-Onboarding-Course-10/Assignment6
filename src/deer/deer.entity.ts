import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { Area } from '../area/area.entity';

@Entity('DEER')
export class Deer {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ name: 'deer_name', unique: true, nullable: false })
  deerName: string;

  @ManyToOne(() => Area)
  @JoinColumn({ name: 'deer_area_id' })
  area: Area;
}
