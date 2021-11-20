import { Injectable } from '@nestjs/common';
import { CreateChargeDto } from './dto/create.charge.dto';
import { AreaService } from '../area/area.service';
import { FineRuleService } from '../fine-rule/fine-rule.service';
import { DiscountRuleService } from '../discount-rule/discount-rule.service';

@Injectable()
export class ChargeService {
  constructor(
    private areaService: AreaService,
    private fineRuleService: FineRuleService,
    private discountRuleService: DiscountRuleService,
  ) {}
  async createCharge(req: CreateChargeDto): Promise<number> {
    this.areaService.createBasicFee(); // 지역에따른 기본요금 생성
    this.fineRuleService.applyFine(); // 벌금규칙 적용
    this.discountRuleService.discount(); //할인규칙 적용
  }
}
