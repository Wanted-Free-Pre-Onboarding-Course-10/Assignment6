import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('PARKINGZONE')
export class ParkingZone {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ name: 'parkingzone_center', type: 'point', nullable: false })
  parkingzoneCenter: string;

  @Column({
    name: 'parkingzone_radius',
    type: 'decimal',
    precision: 10,
    scale: 10,
    nullable: false,
  })
  parkingzoneRadius: number;
}
