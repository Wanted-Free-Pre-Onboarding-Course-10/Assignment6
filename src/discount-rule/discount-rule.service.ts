import { Injectable } from '@nestjs/common';
import { User } from 'src/user/user.entity';
import { CreateChargeDto } from '../charge/dto/create.charge.dto';
import { GetUser } from '../common/get-user.decorator';

export interface DiscountRuleService {
  discount(
    user: User,
    createChargeDto: CreateChargeDto,
    finedMoneyResult,
    basic_fee,
  ): Promise<{ finedMoneyResult: number, message: string }>;
}
