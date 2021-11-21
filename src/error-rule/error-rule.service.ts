import { CreateChargeDto } from '../charge/dto/create.charge.dto';

export interface ErrorRuleService {
  isApplyError(createChargeDto: CreateChargeDto): boolean;
}
