import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('AREA')
export class Area {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ name: 'area_name', nullable: false })
  areaName: string;

  @Column({ name: 'area_boundary', type: 'polygon', nullable: false })
  areaBoundary: number[][];

  @Column({ name: 'area_center', type: 'point', nullable: false })
  areaCenter: number[];

  @Column({ name: 'area_coords', type: 'multipoint', nullable: false })
  areaCoords: number[][];

  @Column({ name: 'basic_fee', unsigned: true, nullable: false })
  basicFee: number;

  @Column({ name: 'extra_fee', unsigned: true, nullable: false })
  extraFee: number;
}
