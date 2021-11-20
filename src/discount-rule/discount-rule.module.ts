import { Module } from '@nestjs/common';
import { DiscountRuleService } from './discount-rule.service';
import { ForbiddenFineRuleServiceImpl } from '../fine-rule/serviceImpl/ForbiddenFineRuleServiceImpl';
import { ParkingZoneDiscountServiceImpl } from './serviceImpl/ParkingZoneDiscountServiceImpl';
import { ParkingzoneRepository } from './discount.repository';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([ParkingzoneRepository])],
  providers: [
    {
      provide: 'DiscountRuleService', useClass: ParkingZoneDiscountServiceImpl,
    }
  ],
})
export class DiscountRuleModule { }
