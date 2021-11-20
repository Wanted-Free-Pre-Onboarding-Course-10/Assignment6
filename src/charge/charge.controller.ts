import { Controller, Post, Req } from '@nestjs/common';
import { CreateChargeDto } from './dto/create.charge.dto';
import { ChargeService } from './charge.service';

@Controller('charge')
export class ChargeController {
  constructor(private chargeService: ChargeService) {}
  @Post()
  createCharge(@Req() createChargeDto: CreateChargeDto): Promise<number> {
    return this.chargeService.createCharge(createChargeDto);
  }
}
