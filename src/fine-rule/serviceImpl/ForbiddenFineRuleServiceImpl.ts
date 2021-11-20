import { FineRuleService } from '../fine-rule.service';
import { Injectable } from '@nestjs/common';
import { CreateChargeDto } from 'src/charge/dto/create.charge.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ForbiddenAreaRepository } from '../fine-rule.repository';
import { DeerRepository } from 'src/deer/deer.repository';

@Injectable()
export class ForbiddenFineRuleServiceImpl implements FineRuleService {
  constructor(
    @InjectRepository(ForbiddenAreaRepository)
    private forbiddenAreaRepository: ForbiddenAreaRepository,
    @InjectRepository(DeerRepository)
    private deerRepository: DeerRepository,
  ) {}

  async applyFine(basicPayment: number, createChargeDto: CreateChargeDto) {
    const { lat, lng, startAt, endAt, boardName } = createChargeDto;

    const currentArea = await this.forbiddenAreaRepository.currentArea(
      lat,
      lng,
    );
    const originalArea = await this.deerRepository.findbyBoardId(boardName);

    const forbiddenArea =
      await this.forbiddenAreaRepository.findAreaByLatAndLng(lat, lng);

    const areaCenterPoint = this.getCenterPointValue(
      originalArea.area.areaCenter.toString(),
    );
    const distanceFromOriginalArea = Math.sqrt(
      Math.pow(parseInt(areaCenterPoint[0]) - parseInt(lat), 2) +
        Math.pow(parseInt(areaCenterPoint[1]) - parseInt(lng), 2),
    );
    console.log(distanceFromOriginalArea);

    if (currentArea.id === originalArea.id) {
      if (forbiddenArea) {
        return basicPayment + 6000;
      } else {
        return basicPayment;
      }
    } else {
      if (forbiddenArea) {
        return basicPayment + 500 * distanceFromOriginalArea + 6000;
      } else {
        return basicPayment + 500 * distanceFromOriginalArea;
      }
    }
  }

  getCenterPointValue(areaCenterText: string) {
    const length = areaCenterText.length;
    return areaCenterText.substring(6, length - 1).split(' ');
  }
}
