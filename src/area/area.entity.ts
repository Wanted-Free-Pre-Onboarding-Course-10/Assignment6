import { Column, Entity, PrimaryGeneratedColumn, Table } from 'typeorm';

@Entity('AREA')
export class Area {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ name: 'area_boundary' })
  areaBoundary: string;

  @Column({ name: 'area_center' })
  areaCenter: string;

  @Column({ name: 'area_coords' })
  areaCoords: string;

  @Column({ name: 'basic_fee', unsigned: true })
  basicFee: number;

  @Column({ name: 'extra_fee', unsigned: true })
  extraFee: number;
}
