import { Module } from '@nestjs/common';
import { DiscountRuleService } from './discount-rule.service';

@Module({
  providers: [DiscountRuleService],
})
export class DiscountRuleModule {}
