import { define } from 'typeorm-seeding';
import * as faker from 'faker';
import { Area } from '../../area/area.entity';
import polylabel from 'polylabel';

define(Area, () => {
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

  return area;
});
