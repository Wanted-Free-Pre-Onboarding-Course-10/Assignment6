import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AreaRepository } from './area.repository';
import { CreateChargeDto } from '../charge/dto/create.charge.dto';
import * as moment from 'moment';
import { LandingBoundaryException } from '../exception/landing_boundary_exception';

@Injectable()
export class AreaService {
  constructor(
    @InjectRepository(AreaRepository)
    private areaRepository: AreaRepository,
  ) {}

  // == 해당 지역의 기본요금 응답 == //
  async createBasicFee(createChargeDto: CreateChargeDto): Promise<number> {
    const { lat, lng, startAt, endAt } = createChargeDto;

    if (await this.areaRepository.isContainPointInMultiPoint(lat, lng))
      throw new LandingBoundaryException();

    const foundArea = await this.areaRepository.findAreaByLatAndLng(lat, lng);

    const diffMinutes = this.calculateDiffHour(startAt, endAt);

    const payment: number =
      foundArea[0].basic_fee + foundArea[0].extra_fee * diffMinutes;

    return payment;
  }

  private calculateDiffHour(startAt: string, endAt: string): number {
    const startMoment = moment(startAt, 'YYYYMMDDHHmm');
    const endMoment = moment(endAt, 'YYYYMMDDHHmm');

    const diffMinutes = moment
      .duration(endMoment.diff(startMoment))
      .asMinutes();

    return diffMinutes;
  }
}
