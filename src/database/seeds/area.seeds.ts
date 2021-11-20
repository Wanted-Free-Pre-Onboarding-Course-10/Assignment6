import { Factory, Seeder } from 'typeorm-seeding';
import { Connection, getManager } from 'typeorm';
import * as faker from 'faker';
import polylabel from 'polylabel';
import { Area } from '../../area/area.entity';

export class CreateArea implements Seeder {
  async run(factory: Factory, connection: Connection) {
    const boundaryCount = faker.datatype.number({ min: 3, max: 8 });
    const polygon = [];

    for (let i = 0; i < boundaryCount; i++) {
      const latitude = faker.datatype.number({
        min: -180,
        max: 180,
        precision: 0.001,
      });
      const longitude = faker.datatype.number({
        min: -90,
        max: 90,
        precision: 0.001,
      });

      const point = [latitude, longitude];
      polygon.push(point);
    }

    const center: number[] = polylabel([polygon]);
    const area = new Area();
    area.areaBoundary = [polygon];
    area.areaCenter = center;
    area.areaCoords = polygon;

    area.basicFee = faker.datatype.number({ max: 10000 });
    area.extraFee = faker.datatype.number({ max: 10000 });

    const em = getManager();
    const result = await em.query(`
    INSERT INTO AREA
      (area_boundary, area_center, area_coords, basic_fee, extra_fee)
    VALUES
      (
       ST_PolygonFromText('POLYGON((${this.makeLastText(
         polygon[0],
         this.makePolygonText(polygon),
       )}))'),
       ST_GeomFromText('POINT(${center[0]} ${center[1]})'),
       ST_GEOMFROMTEXT('MultiPoint( ${this.makeCoords(polygon)} )'), ${
      area.basicFee
    }, ${area.extraFee} 
      );`);
  }

  makePolygonText(polygon: number[][]) {
    let text = '';
    for (const point of polygon) {
      text += `${point[0]} ${point[1]}, `;
    }
    return text;
  }

  makeCoords(coords: number[][]) {
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

  makeLastText(start: number[], text: string) {
    text += `${start[0]} ${start[1]}`;
    return text;
  }
}
