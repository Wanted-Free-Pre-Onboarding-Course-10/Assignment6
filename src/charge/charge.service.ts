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
  ) { }

  async createCharge(
    @GetUser() user,
    createChargeDto: CreateChargeDto,
  ): Promise<any> {
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
    if (basicPayment.payment != finedMoneyResult.basicPayment) {
      return this.makeSpecification2(basicPayment, finedMoneyResult)
      //return finedMoneyResult.basicPayment;
    }

    // == 할인규칙 적용 == //
    const finalPayment = await this.discountRuleService.discount(
      user,
      createChargeDto,
      finedMoneyResult,
      basicPayment.basic_fee,
    ); //할인규칙 적용

    return this.makeSpecification(basicPayment, finedMoneyResult, finalPayment);
  }

  async makeSpecification2(basicPayment, finedMoneyResult) {
    const data = {
      "사용 시간": basicPayment.usage_time,
      "지역 기본 금액": basicPayment.basic_fee,
      "지역 운행 금액": basicPayment.operating_fee,
      "사용 지역": "강남",
      "벌금 사유": finedMoneyResult.reason,
      "벌금 금액": finedMoneyResult.basicPayment - basicPayment.payment,
      "총 금액": finedMoneyResult.basicPayment,
    }
    return data;
  }

  async makeSpecification(basicPayment, finedMoneyResult, finalPayment) {
    const data = {
      "사용 시간": basicPayment.usage_time,
      "지역 기본 금액": basicPayment.basic_fee,
      "지역 운행 금액": basicPayment.operating_fee,
      "사용 지역": "강남",
      "할인 사유": finalPayment.message,
      "할인 금액": basicPayment.payment - finalPayment.finedMoneyResult,
      "총 금액": finalPayment.finedMoneyResult,
    }
    return data;
  }
}


