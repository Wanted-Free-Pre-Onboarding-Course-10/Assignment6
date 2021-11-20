import { Body, Controller, Logger, Post } from '@nestjs/common';
import { CreateChargeDto } from './dto/create.charge.dto';
import { ChargeService } from './charge.service';
import { GetUser } from '../common/get-user.decorator';

@Controller('charge')
export class ChargeController {
  constructor(private chargeService: ChargeService) {}

  private logger = new Logger('ChargeController');
  @Post()
  createCharge(
    @GetUser() user,
    @Body() createChargeDto: CreateChargeDto,
  ): Promise<void> {
    return this.chargeService.createCharge(user, createChargeDto);
  }
}
