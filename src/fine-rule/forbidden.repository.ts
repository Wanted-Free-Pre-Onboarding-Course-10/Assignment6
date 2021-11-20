import { EntityRepository, Repository } from 'typeorm';
import { ForbiddenArea } from './forbidden.entity';

@EntityRepository(ForbiddenArea)
export class ForbiddenRepository extends Repository<ForbiddenArea> {
  async createForbiddenArea(datas) {
    for (const data of datas) {
      const result = await this.manager.query(`
    INSERT INTO FORBIDDEN_AREA
      (forbidden_area_boundary, forbidden_area_coords) 
    VALUES 
      (
       ST_PolygonFromText('POLYGON((${this.makeLastText(
        data[0],
        this.makePolygonText(data),
      )}))'),
       ST_GEOMFROMTEXT('MultiPoint( ${this.makeCoords(data)} )')
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
