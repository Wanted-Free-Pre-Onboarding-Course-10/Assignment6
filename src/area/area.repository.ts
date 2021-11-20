import { EntityRepository, Repository } from 'typeorm';
import { Area } from './area.entity';

@EntityRepository(Area)
export class AreaRepository extends Repository<Area> {
  async findAreaByLatAndLng(lat: string, lng: string): Promise<Area> {
    const foundArea = await this.manager.query(` 
    select * from area where ST_Contains(area.area_boundary, ST_GeomFromText('POINT(${parseFloat(
      lat,
    )} ${parseFloat(lng)})'));
    `);

    return foundArea;
  }
}
