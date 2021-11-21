import { CreateChargeDto } from '../charge/dto/create.charge.dto';

export interface ErrorRuleService {
    applyFine(
        basicPayment: number,
        createChargeDto: CreateChargeDto,
    ): Promise<number>;
}
