import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AreaRepository } from './area.repository';
import { CreateChargeDto } from '../charge/dto/create.charge.dto';
import * as moment from 'moment';
import { LandingBoundaryException } from '../exception/landing_boundary_exception';
import { DeerRepository } from '../deer/deer.repository';

@Injectable()
export class AreaService {
  constructor(
    @InjectRepository(AreaRepository)
    private areaRepository: AreaRepository,
    @InjectRepository(DeerRepository)
    private deerRepository: DeerRepository,
  ) {}

  // == 해당 지역의 기본요금 응답 == //
  async createBasicFee(createChargeDto: CreateChargeDto): Promise<{
    payment: number;
    basic_fee: number;
    usage_time: number;
    operating_fee: number;
    area: string;
    landingArea: any;
  }> {
    const { lat, lng, startAt, endAt, boardName } = createChargeDto;

    if (await this.isContainMultipointBoundary(lat, lng))
      throw new LandingBoundaryException();

    const deer = await this.deerRepository.findbyBoardId(boardName);

    const landingArea = await this.areaRepository.findAreaByLatAndLng(lat, lng);
    const landingAreaName = landingArea[0]
      ? landingArea[0].area_name
      : '범위를 벗어난 지역';

    const diffMinutes = this.calculateDiffMinutes(startAt, endAt);

    const payment: number =
      deer.area.basicFee + deer.area.extraFee * diffMinutes;

    const data = {
      payment: payment,
      basic_fee: deer.area.basicFee,
      usage_time: diffMinutes,
      operating_fee: deer.area.extraFee * diffMinutes,
      area: deer.area.areaName,
      landingArea: landingAreaName,
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
  private calculateDiffMinutes(startAt: string, endAt: string): number {
    const startMoment = moment(startAt, 'YYYYMMDDHHmm');
    const endMoment = moment(endAt, 'YYYYMMDDHHmm');

    const diffMinutes = moment
      .duration(endMoment.diff(startMoment))
      .asMinutes();

    return diffMinutes;
  }
}
