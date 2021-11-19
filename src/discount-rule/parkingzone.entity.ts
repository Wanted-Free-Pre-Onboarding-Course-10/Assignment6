import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('PARKINGZONE')
export class ParkingZone {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ name: 'parkingzone_center_lat' })
  parkingzoneCenterLat: string;

  @Column({ name: 'parkingzone_center_lng' })
  parkingzoneCenterLng: string;

  @Column({ name: 'parkingzone_radius' })
  parkingzoneRadius: string;
}
