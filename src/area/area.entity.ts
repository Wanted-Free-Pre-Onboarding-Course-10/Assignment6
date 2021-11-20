import { Column, Entity, PrimaryGeneratedColumn, Table } from 'typeorm';

@Entity('AREA')
export class Area {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ name: 'area_boundary', type: 'polygon', nullable: false })
  areaBoundary: string;

  @Column({ name: 'area_center', type: 'point', nullable: false })
  areaCenter: string;
  @Column({ name: 'area_coords', type: 'multipoint', nullable: false })
  areaCoords: string;

  @Column({ name: 'basic_fee', unsigned: true, nullable: false })
  basicFee: number;

  @Column({ name: 'extra_fee', unsigned: true, nullable: false })
  extraFee: number;
}
