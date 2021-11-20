import { Body, Controller, Logger, Post, Req } from '@nestjs/common';
import { CreateChargeDto } from './dto/create.charge.dto';
import { ChargeService } from './charge.service';

@Controller('charge')
export class ChargeController {
  constructor(private chargeService: ChargeService) {}

  private logger = new Logger('ChargeController');
  @Post()
  createCharge(@Body() createChargeDto: CreateChargeDto): Promise<void> {
    return this.chargeService.createCharge(createChargeDto);
  }
}
