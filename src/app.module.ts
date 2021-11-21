import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeORMConfig } from './ormconfig';
import { UserModule } from './user/user.module';
import { DeerModule } from './deer/deer.module';
import { AreaModule } from './area/area.module';
import { FineRuleModule } from './fine-rule/fine-rule.module';
import { DiscountRuleModule } from './discount-rule/discount-rule.module';
import { ChargeModule } from './charge/charge.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AreaRepository } from './area/area.repository';
import { Area } from './area/area.entity';
import { ForbiddenRepository } from './fine-rule/forbidden.repository';
import { ForbiddenArea } from './fine-rule/forbidden.entity';
import { ParkingzoneRepository } from './discount-rule/discount.repository';
import { ParkingZone } from './discount-rule/parkingzone.entity';
import { DeerRepository } from './deer/deer.repository';
import { Deer } from './deer/deer.entity';
import { ErrorRuleModule } from './error-rule/error-rule.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeORMConfig),
    TypeOrmModule.forFeature([
      AreaRepository,
      Area,
      ForbiddenRepository,
      ForbiddenArea,
      ParkingzoneRepository,
      ParkingZone,
      DeerRepository,
      Deer,
    ]),
    UserModule,
    DeerModule,
    AreaModule,
    FineRuleModule,
    DiscountRuleModule,
    ChargeModule,
    ErrorRuleModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
