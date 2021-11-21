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
  async createBasicFee(
    createChargeDto: CreateChargeDto,
  ): Promise<{ payment: number; basic_fee: number }> {
    const { lat, lng, startAt, endAt } = createChargeDto;

    if (await this.isContainMultipointBoundary(lat, lng))
      throw new LandingBoundaryException();

    const foundArea = await this.areaRepository.findAreaByLatAndLng(lat, lng);

    const diffMinutes = this.calculateDiffHour(startAt, endAt);

    const payment: number =
      foundArea[0].basic_fee + foundArea[0].extra_fee * diffMinutes;

    const data = {
      payment: payment,
      basic_fee: foundArea[0].basic_fee,
    };

    return data;
  }

  // == 경계 multipoint에 반납했는지 확인하는 메서드 == //
  private async isContainMultipointBoundary(
    lat: string,
    lng: string,
  ): Promise<boolean> {
    if ((await this.areaRepository.getCountPointInMultiPoint(lat, lng)) > 0)
      return true;
    return false;
  }

  // == 걸린 분 리턴하는 메서드 == //
  private calculateDiffHour(startAt: string, endAt: string): number {
    const startMoment = moment(startAt, 'YYYYMMDDHHmm');
    const endMoment = moment(endAt, 'YYYYMMDDHHmm');

    const diffMinutes = moment
      .duration(endMoment.diff(startMoment))
      .asMinutes();

    return diffMinutes;
  }
}
