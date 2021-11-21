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
  private FINE_PER_DISTANCE = 50;
  private FINE_FEE = 6000;

  async applyFine(
    basicPayment: number,
    createChargeDto: CreateChargeDto,
  ): Promise<{ basicPayment: number; reason: string }> {
    const { lat, lng, boardName } = createChargeDto;
    const currentArea = await this.forbiddenAreaRepository.currentArea(
      lat,
      lng,
    );

    const forbiddenArea =
      await this.forbiddenAreaRepository.findAreaByLatAndLng(lat, lng);

    const originalArea = await this.deerRepository.findbyBoardId(boardName);

    const areaCenterPoint = this.getCenterPointValue(
      originalArea.area.areaCenter.toString(),
    );

    if (currentArea[0] && currentArea[0].id === originalArea.id) {
      if (forbiddenArea[0]) {
        return {
          basicPayment: basicPayment + this.FINE_FEE,
          reason: '주차 금지 구역 위반',
        };
      } else {
        return {
          basicPayment: basicPayment,
          reason: '위반 사항 없음',
        };
      }
    } else {
      const distanceFromOriginalArea = Math.floor(
        Math.sqrt(
          Math.pow(parseInt(areaCenterPoint[0]) - parseInt(lat), 2) +
            Math.pow(parseInt(areaCenterPoint[1]) - parseInt(lng), 2),
        ),
      );
      if (forbiddenArea[0]) {
        return {
          basicPayment:
            basicPayment +
            this.FINE_PER_DISTANCE * distanceFromOriginalArea +
            this.FINE_FEE,
          reason: '주차 금지 구역 및 지역 이동 위반',
        };
      } else {
        return {
          basicPayment:
            basicPayment + this.FINE_PER_DISTANCE * distanceFromOriginalArea,
          reason: '지역 이동 위반',
        };
      }
    }
  }

  getCenterPointValue(areaCenterText: string) {
    const length = areaCenterText.length;
    return areaCenterText.substring(6, length - 1).split(' ');
  }
}
