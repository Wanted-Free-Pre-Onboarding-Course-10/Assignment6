import { Injectable } from '@nestjs/common';
import { CreateChargeDto } from '../charge/dto/create.charge.dto';
export interface DiscountRuleService {
  discount(createChargeDto: CreateChargeDto, price: number);
}
