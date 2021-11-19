import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('FORBIDDEN_AREA')
export class ForbiddenArea {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ name: 'forbidden_area_boundary' })
  forbiddenAreaBoundary: string;

  @Column({ name: 'forbidden_area_coords' })
  forbiddentAreaCoords: string;
}
