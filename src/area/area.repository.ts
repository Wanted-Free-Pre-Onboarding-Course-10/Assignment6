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

  async getCountPointInMultiPoint(lat: string, lng: string): Promise<number> {
    const count = await this.manager.query(` 
    select count(*) as cnt from area where ST_Contains(area.area_coords, ST_GeomFromText('POINT(${parseFloat(
      lat,
    )} ${parseFloat(lng)})'));
    `);

    return count[0].cnt;
  }

  async createArea(datas) {
    for (const data of datas) {
      const { areaBoundary, areaCoords, areaCenter, basicFee, extraFee } = data;
      const result = await this.manager.query(`
    INSERT INTO AREA
      (area_boundary, area_center, area_coords, basic_fee, extra_fee)
    VALUES
      (
       ST_PolygonFromText('POLYGON((${this.makeLastText(
         areaBoundary[0],
         this.makePolygonText(areaCoords),
       )}))'),
       ST_GeomFromText('POINT(${areaCenter[0]} ${areaCenter[1]})'),
       ST_GEOMFROMTEXT('MultiPoint( ${this.makeCoords(
         areaCoords,
       )} )'), ${basicFee}, ${extraFee}
      );`);
    }
  }

  private makePolygonText(polygon: number[][]) {
    let text = '';
    for (const point of polygon) {
      text += `${point[0]} ${point[1]}, `;
    }
    return text;
  }

  private makeCoords(coords: number[][]) {
    let text = '';
    const length = coords.length;
    let count = 0;
    for (const point of coords) {
      text += `${point[0]} ${point[1]}`;
      count++;
      if (count !== length) {
        text += ', ';
      }
    }
    return text;
  }

  private makeLastText(start: number[], text: string) {
    text += `${start[0]} ${start[1]}`;
    return text;
  }
}
