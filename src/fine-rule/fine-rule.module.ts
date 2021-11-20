import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DeerRepository } from 'src/deer/deer.repository';
import { Deer } from '../deer/deer.entity';
import { ForbiddenAreaRepository } from './fine-rule.repository';
import { FineRuleService } from './fine-rule.service';
import { ForbiddenFineRuleServiceImpl } from './serviceImpl/ForbiddenFineRuleServiceImpl';

@Module({
  imports: [TypeOrmModule.forFeature([ForbiddenAreaRepository, DeerRepository])],
  providers: [
    {
      provide: 'FineRuleService',
      useClass: ForbiddenFineRuleServiceImpl,
    },
  ],
})
export class FineRuleModule {}
