import { Module } from '@nestjs/common';
import { ChargeController } from './charge.controller';
import { ChargeService } from './charge.service';
import { AreaService } from '../area/area.service';
import { ParkingZoneDiscountServiceImpl } from '../discount-rule/serviceImpl/ParkingZoneDiscountServiceImpl';
import { ForbiddenFineRuleServiceImpl } from '../fine-rule/serviceImpl/ForbiddenFineRuleServiceImpl';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AreaRepository } from '../area/area.repository';
import { ForbiddenAreaRepository } from 'src/fine-rule/fine-rule.repository';
import { DeerRepository } from 'src/deer/deer.repository';

@Module({
  imports: [TypeOrmModule.forFeature([AreaRepository, ForbiddenAreaRepository, DeerRepository])],
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
