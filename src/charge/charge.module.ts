import { Module } from '@nestjs/common';
import { ChargeController } from './charge.controller';
import { ChargeService } from './charge.service';
import { AreaService } from '../area/area.service';
import { ParkingZoneDiscountServiceImpl } from '../discount-rule/serviceImpl/ParkingZoneDiscountServiceImpl';
import { ForbiddenFineRuleServiceImpl } from '../fine-rule/serviceImpl/ForbiddenFineRuleServiceImpl';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AreaRepository } from '../area/area.repository';

@Module({
  imports: [TypeOrmModule.forFeature([AreaRepository])],
  controllers: [ChargeController],
  providers: [
    ChargeService,
    AreaService,
    { provide: 'FineRuleService', useClass: ForbiddenFineRuleServiceImpl },
    {
      provide: 'DiscountRuleService',
      useClass: ParkingZoneDiscountServiceImpl,
    },
    ForbiddenFineRuleServiceImpl,
  ],
})
export class ChargeModule {}
