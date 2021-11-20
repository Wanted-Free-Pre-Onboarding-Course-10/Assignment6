import { DiscountRuleService } from '../discount-rule.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ParkingZoneDiscountServiceImpl implements DiscountRuleService {
  discount() {}
}
