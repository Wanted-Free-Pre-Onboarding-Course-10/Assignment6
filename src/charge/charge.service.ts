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
  ): Promise<any> {
    // == 예외 규칙 적용 == //
    const { payment, message } =
      this.errorRuleService.isApplyError(createChargeDto);
    if (payment == 0) return this.makeErrorResponseData(payment, message);

    // == 지역에따른 기본요금 생성 == //
    const basicData = await this.areaService.createBasicFee(createChargeDto);

    // == 벌금규칙 적용 == //
    const finedMoneyResult = await this.fineRuleService.applyFine(
      basicData.payment,
      createChargeDto,
    );

    // 기존 금액과 벌금 고려후 금액이 다르다면 할인 X
    if (basicData.payment != finedMoneyResult.basicPayment) {
      return this.makeFineResponseData(
        basicData,
        finedMoneyResult,
        basicData.area,
        basicData.landingArea,
      );
    }

    // == 할인규칙 적용 == //
    const finalPayment = await this.discountRuleService.discount(
      user,
      createChargeDto,
      finedMoneyResult,
      basicData.basic_fee,
    ); //할인규칙 적용

    return this.makeDiscountResponseData(
      basicData,
      finalPayment,
      basicData.area,
      basicData.landingArea,
    );
  }

  makeFineResponseData(basicPayment, finedMoneyResult, area, landingArea) {
    const data = {
      '사용 시간': basicPayment.usage_time,
      '지역 기본 금액': basicPayment.basic_fee,
      '지역 운행 금액': basicPayment.operating_fee,
      '지정 지역': area,
      '반납 지역': landingArea,
      '벌금 사유': finedMoneyResult.reason,
      '벌금 금액': finedMoneyResult.basicPayment - basicPayment.payment,
      '총 금액': finedMoneyResult.basicPayment,
    };
    return data;
  }

  makeDiscountResponseData(basicPayment, finalPayment, area, landingArea) {
    const data = {
      '사용 시간': basicPayment.usage_time,
      '지역 기본 금액': basicPayment.basic_fee,
      '지역 운행 금액': basicPayment.operating_fee,
      '지정 지역': area,
      '반납 지역': landingArea,
      '할인 사유': finalPayment.message,
      '할인 금액': basicPayment.payment - finalPayment.finedMoneyResult,
      '총 금액': finalPayment.finedMoneyResult,
    };
    return data;
  }

  makeErrorResponseData(payment, message) {
    return {
      '예외 사유': message,
      '총 금액': payment,
    };
  }
}
