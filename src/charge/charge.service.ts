import { Inject, Injectable } from '@nestjs/common';
import { CreateChargeDto } from './dto/create.charge.dto';
import { AreaService } from '../area/area.service';
import { FineRuleService } from '../fine-rule/fine-rule.service';
import { DiscountRuleService } from '../discount-rule/discount-rule.service';
import { GetUser } from '../common/get-user.decorator';

@Injectable()
export class ChargeService {
  constructor(
    private areaService: AreaService,
    @Inject('FineRuleService')
    private fineRuleService: FineRuleService,
    @Inject('DiscountRuleService')
    private discountRuleService: DiscountRuleService,
  ) {}
  async createCharge(
    @GetUser() user,
    createChargeDto: CreateChargeDto,
  ): Promise<void> {
    const basicPayment = await this.areaService.createBasicFee(createChargeDto); // 지역에따른 기본요금 생성

    const finedMoneyResult = this.fineRuleService.applyFine(
      basicPayment,
      createChargeDto,
    ); // 벌금규칙 적용
    this.discountRuleService.discount(user, createChargeDto, finedMoneyResult); //할인규칙 적용

    // return payment;
  }
}
