import { Module } from '@nestjs/common';
import { AreaController } from './area.controller';
import { AreaService } from './area.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AreaRepository } from './area.repository';
import { DeerRepository } from '../deer/deer.repository';

@Module({
  imports: [TypeOrmModule.forFeature([AreaRepository, DeerRepository])],
  controllers: [AreaController],
  providers: [AreaService],
})
export class AreaModule {}
