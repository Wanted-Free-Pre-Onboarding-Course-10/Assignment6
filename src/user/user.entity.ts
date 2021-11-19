import {
  JoinTable,
  Column,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Deer } from '../deer/deer.entity';

@Entity('USER')
export class User {
  @PrimaryGeneratedColumn('increment')
  id: number;
  @Column({ nullable: false, unique: true })
  username: string;

  @Column({ nullable: false })
  password: string;

  @ManyToMany(() => Deer)
  @JoinTable({ name: 'USER_DEER' })
  deers: Deer[];
}
