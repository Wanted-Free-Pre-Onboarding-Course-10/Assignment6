import { Injectable } from '@nestjs/common';
import { CreateChargeDto } from 'src/charge/dto/create.charge.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ErrorRuleService } from '../error-rule.service'
import { DeerRepository } from 'src/deer/deer.repository';

@Injectable()
export class ErrorRuleServiceImpl implements ErrorRuleService {
  constructor(

  ) { }
  applyError(
    basicPayment: number,
    createChargeDto: CreateChargeDto,
  ): Promise<number> {
    return;
  }
}