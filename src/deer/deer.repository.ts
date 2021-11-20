import { EntityRepository, Repository } from 'typeorm';
import { Deer } from './deer.entity';

@EntityRepository(Deer)
export class DeerRepository extends Repository<Deer> {
  async createDeer(deer) {
    await this.save(deer);
  }
}
