import { CreateChargeDto } from '../charge/dto/create.charge.dto';

export interface ErrorRuleService {
    applyError(
        basicPayment: number,
        createChargeDto: CreateChargeDto,
    ): Promise<number>;
}
