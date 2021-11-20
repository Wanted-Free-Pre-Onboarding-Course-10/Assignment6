import { Module } from '@nestjs/common';
import { DiscountRuleService } from './discount-rule.service';
import { ForbiddenFineRuleServiceImpl } from '../fine-rule/serviceImpl/ForbiddenFineRuleServiceImpl';
import { ParkingZoneDiscountServiceImpl } from './serviceImpl/ParkingZoneDiscountServiceImpl';

@Module({
  providers: [
    {
      provide: 'DiscountRuleService',
      useClass: ParkingZoneDiscountServiceImpl,
    },
  ],
})
export class DiscountRuleModule {}
