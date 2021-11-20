import { EntityRepository, Repository } from 'typeorm';
import { ParkingZone } from './parkingzone.entity';

@EntityRepository(ParkingZone)
export class ParkingzoneRepository extends Repository<ParkingZone> {
    async findParkingzoneByLatAmdLng(lat: string, lng: string): Promise<ParkingZone> {
        const foundArea = await this.manager.query(` 
        select * from parkingzone where ST_Contains(parkingzone.parkingzone_center, ST_GeomFromText('POINT(${parseFloat(
            lat,
        )} ${parseFloat(lng)})'));
        `);
        return foundArea;
    }
}