import { InjectRepository } from "@nestjs/typeorm";
import { Area } from "src/area/area.entity";
import { Deer } from "src/deer/deer.entity";
import { Connection, EntityRepository, Repository } from "typeorm";
import { ForbiddenArea } from "./forbidden.entity";

@EntityRepository(ForbiddenArea)
export class ForbiddenAreaRepository extends Repository<ForbiddenArea>{
  
  async findAreaByLatAndLng(lat: string, lng: string): Promise<ForbiddenArea> {
    const forbiddenArea = await this.manager.query(` 
    select * from area where ST_Contains(forbidden_area.forbidden_area_boundary, ST_GeomFromText('POINT(${parseFloat(
      lat,
    )} ${parseFloat(lng)})'));
    `);

    return forbiddenArea;
  }

  
  async currentArea(lat: string, lng: string): Promise<Area>{
    const currentArea = await this.manager.query(` 
    select * from area where ST_Contains(area.area_boundary, ST_GeomFromText('POINT(${parseFloat(
      lat,
    )} ${parseFloat(lng)})'));
    `);

    return currentArea;
  }

  async distanceFromOrigianlArea(lat: string, lng: string) {
    //거리계산을 어떤 방법으로 할까?
    //원래 지역에서 중심점으로부터의 현재의 거리를 계산하면 되겠다.
    //그러면 원래 지역을 어떻게 받아오나?
    // const distance = this.
  }
}