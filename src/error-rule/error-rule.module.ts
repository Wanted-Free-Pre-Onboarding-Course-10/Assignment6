import { Module } from '@nestjs/common';
import { ErrorRuleService } from './error-rule.service';
import { WrongBikeServiceImpl } from './serviceImpl/WrongBikeServiceImpl';

@Module({
  providers: [
    {
      provide: 'ErrorRuleService',
      useClass: WrongBikeServiceImpl,
    },
  ],
})
export class ErrorRuleModule {}
