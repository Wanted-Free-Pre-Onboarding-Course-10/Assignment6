import { getManager, EntityRepository, Repository } from 'typeorm';
import { ParkingZone } from './parkingzone.entity';

@EntityRepository(ParkingZone)
export class ParkingzoneRepository extends Repository<ParkingZone> {
  async findParkingzoneByLatAmdLng(
    lat: string,
    lng: string,
  ): Promise<ParkingZone> {
    //원만드는 쿼리
    const foundArea = await this.manager.query(` 
        select * from parkingzone where ST_Contains((SELECT ST_BUFFER(parkingzone.parkingzone_center, parkingzone.parkingzone_radius)), ST_GeomFromText('POINT(${parseFloat(
          lat,
        )} ${parseFloat(lng)})'));
        `);
    return foundArea;
  }

  async createParkingZone(datas) {
    for (const data of datas) {
      const result = await this.manager.query(`
    INSERT INTO PARKINGZONE
      (parkingzone_radius, parkingzone_center) 
    VALUES  
      (
       ${data.radius},
       ST_GeomFromText('POINT(${data.center[0]} ${data.center[1]})')
      );`);
    }
  }
}
