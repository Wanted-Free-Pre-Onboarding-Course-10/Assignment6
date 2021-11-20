import { Module } from '@nestjs/common';
import { FineRuleService } from './fine-rule.service';

@Module({
  providers: [FineRuleService]
})
export class FineRuleModule {}
