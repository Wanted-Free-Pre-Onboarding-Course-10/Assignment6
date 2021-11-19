import { Module } from '@nestjs/common';
import { DeerController } from './deer.controller';
import { DeerService } from './deer.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Deer } from './deer.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Deer])],
  controllers: [DeerController],
  providers: [DeerService],
})
export class DeerModule {}
