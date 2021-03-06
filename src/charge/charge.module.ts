import { Module } from '@nestjs/common';
import { ChargeController } from './charge.controller';
import { ChargeService } from './charge.service';
import { AreaService } from '../area/area.service';
import { ParkingZoneDiscountServiceImpl } from '../discount-rule/serviceImpl/ParkingZoneDiscountServiceImpl';
import { ForbiddenFineRuleServiceImpl } from '../fine-rule/serviceImpl/ForbiddenFineRuleServiceImpl';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AreaRepository } from '../area/area.repository';
import { ParkingzoneRepository } from '../discount-rule/discount.repository';
import { UsersRepository } from '../user/user.repository';
import { ForbiddenAreaRepository } from 'src/fine-rule/fine-rule.repository';
import { DeerRepository } from 'src/deer/deer.repository';
import { ErrorRuleService } from '../error-rule/error-rule.service';
import { WrongBikeServiceImpl } from '../error-rule/serviceImpl/WrongBikeServiceImpl';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      AreaRepository,
      ParkingzoneRepository,
      UsersRepository,
      ForbiddenAreaRepository,
      DeerRepository,
    ]),
  ],
  controllers: [ChargeController],
  providers: [
    ChargeService,
    AreaService,
    { provide: 'FineRuleService', useClass: ForbiddenFineRuleServiceImpl },
    {
      provide: 'DiscountRuleService',
      useClass: ParkingZoneDiscountServiceImpl,
    },
    {
      provide: 'ErrorRuleService',
      useClass: WrongBikeServiceImpl,
    },
    ForbiddenFineRuleServiceImpl,
  ],
})
export class ChargeModule {}
