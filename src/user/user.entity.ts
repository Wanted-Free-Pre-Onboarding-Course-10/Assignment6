import {
  JoinTable,
  Column,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
  BeforeInsert,
} from 'typeorm';
import { Deer } from '../deer/deer.entity';
import * as bcrypt from 'bcrypt';

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

  @BeforeInsert()
  async setPassword(password: string) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(password || this.password, salt);
  }
}
