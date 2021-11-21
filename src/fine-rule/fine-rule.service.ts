import { CreateChargeDto } from '../charge/dto/create.charge.dto';

export interface FineRuleService {
  applyFine(
    basicPayment: number,
    createChargeDto: CreateChargeDto,
  ): Promise<{ basicPayment: number; reason: string }>;
}
