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

  async isContainPointInMultiPoint(lat: string, lng: string): Promise<boolean> {
    const count = await this.manager.query(` 
    select count(*) as cnt from area where ST_Contains(area.area_coords, ST_GeomFromText('POINT(${parseFloat(
      lat,
    )} ${parseFloat(lng)})'));
    `);

    if (count[0].cnt > 0) return true;

    return false;
  }
}
