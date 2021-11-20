import { Area } from "../area/area.entity";
import { EntityRepository, Repository } from "typeorm";
import { Deer } from "./deer.entity";

@EntityRepository(Deer)
export class DeerRepository extends Repository<Deer>{
  async findbyBoardId(boardName): Promise<Area> {
    const board = await this.findOne({where:{deerName:boardName}});
    return board.area;
  }
}