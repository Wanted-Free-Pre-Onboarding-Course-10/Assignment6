import { Module } from '@nestjs/common';
import { DeerController } from './deer.controller';
import { DeerService } from './deer.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Deer } from './deer.entity';
import { DeerRepository } from './deer.repository';

@Module({
  imports: [TypeOrmModule.forFeature([DeerRepository])],
  controllers: [DeerController],
  providers: [DeerService],
})
export class DeerModule {}
