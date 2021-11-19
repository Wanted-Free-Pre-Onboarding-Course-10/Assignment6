import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('FORBIDDEN_AREA')
export class ForbiddenArea {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ name: 'forbidden_area_boundary', type: 'polygon', nullable: false })
  forbiddenAreaBoundary: string;

  @Column({
    name: 'forbidden_area_coords',
    type: 'multipoint',
    nullable: false,
  })
  forbiddentAreaCoords: string;
}
