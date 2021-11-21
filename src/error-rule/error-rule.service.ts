import { CreateChargeDto } from '../charge/dto/create.charge.dto';

export interface ErrorRuleService {
  isApplyError(createChargeDto: CreateChargeDto): {
    message: string;
    payment: number;
  };
}
