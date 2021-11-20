import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeORMConfig } from './ormconfig';
import { UserModule } from './user/user.module';
import { DeerModule } from './deer/deer.module';
import { AreaModule } from './area/area.module';
import { FineRuleModule } from './fine-rule/fine-rule.module';
import { DiscountRuleModule } from './discount-rule/discount-rule.module';
import { ChargeModule } from './charge/charge.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeORMConfig),
    UserModule,
    DeerModule,
    AreaModule,
    FineRuleModule,
    DiscountRuleModule,
    ChargeModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
