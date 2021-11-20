import { Area } from 'src/area/area.entity';
import { EntityRepository, Repository } from 'typeorm';
import { ForbiddenArea } from './forbidden.entity';

@EntityRepository(ForbiddenArea)
export class ForbiddenAreaRepository extends Repository<ForbiddenArea> {
  async findAreaByLatAndLng(lat: string, lng: string): Promise<ForbiddenArea> {
    const forbiddenArea = await this.manager.query(` 
    select * from forbidden_area where ST_Contains(forbidden_area_boundary, ST_GeomFromText('POINT(${parseFloat(
      lat,
    )} ${parseFloat(lng)})'));
    `);

    return forbiddenArea;
  }

  async currentArea(lat: string, lng: string): Promise<Area> {
    const currentArea = await this.manager.query(` 
    select * from area where ST_Contains(area.area_boundary, ST_GeomFromText('POINT(${parseFloat(
      lat,
    )} ${parseFloat(lng)})'));
    `);

    return currentArea;
  }
}
