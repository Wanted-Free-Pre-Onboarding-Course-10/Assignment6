import { Inject, Injectable } from '@nestjs/common';
import { CreateChargeDto } from './dto/create.charge.dto';
import { AreaService } from '../area/area.service';
import { FineRuleService } from '../fine-rule/fine-rule.service';
import { DiscountRuleService } from '../discount-rule/discount-rule.service';
import { GetUser } from '../common/get-user.decorator';
import { ErrorRuleService } from '../error-rule/error-rule.service';

@Injectable()
export class ChargeService {
  constructor(
    @Inject('ErrorRuleService')
    private errorRuleService: ErrorRuleService,
    private areaService: AreaService,
    @Inject('FineRuleService')
    private fineRuleService: FineRuleService,
    @Inject('DiscountRuleService')
    private discountRuleService: DiscountRuleService,
  ) {}

  async createCharge(
    @GetUser() user,
    createChargeDto: CreateChargeDto,
  ): Promise<number> {
    // == 예외 규칙 적용 == //
    if (this.errorRuleService.isApplyError(createChargeDto)) return 0;

    // == 지역에따른 기본요금 생성 == //
    const basicPayment = await this.areaService.createBasicFee(createChargeDto);

    // == 벌금규칙 적용 == //
    const finedMoneyResult = await this.fineRuleService.applyFine(
      basicPayment.payment,
      createChargeDto,
    );

    // 기존 금액과 벌금 고려후 금액이 다르다면 할인 X
    if (basicPayment.payment !== finedMoneyResult) {
      return finedMoneyResult;
    }

    // == 할인규칙 적용 == //
    const finalPayment = await this.discountRuleService.discount(
      user,
      createChargeDto,
      finedMoneyResult,
      basicPayment.basic_fee,
    ); //할인규칙 적용

    return finalPayment;
  }
}
