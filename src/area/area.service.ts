import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AreaRepository } from './area.repository';

@Injectable()
export class AreaService {
  constructor(
    @InjectRepository(AreaRepository)
    private areaRepository: AreaRepository,
  ) {}

  // ==  == //
  async createBasicFee() {}
}
