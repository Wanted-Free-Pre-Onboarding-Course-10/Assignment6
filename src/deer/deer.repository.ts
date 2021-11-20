import { EntityRepository, Repository } from 'typeorm';
import { Deer } from './deer.entity';

@EntityRepository(Deer)
export class DeerRepository extends Repository<Deer> {
  findbyBoardId(boardName): Promise<Deer> {
    return this.findOne({ where: { deerName: boardName } });
  }
}
