import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Area } from '../area/area.entity';

@Entity('DEER')
export class Deer {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ name: 'deer_name', unique: true, nullable: false })
  deerName: string;

  @OneToOne(() => Area, { eager: true })
  @JoinColumn({ name: 'deer_area_id' })
  area: Area;
}
