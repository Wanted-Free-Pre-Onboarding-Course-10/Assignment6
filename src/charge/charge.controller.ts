import { Body, Controller, Logger, Post, UseGuards } from '@nestjs/common';
import { CreateChargeDto } from './dto/create.charge.dto';
import { ChargeService } from './charge.service';
import { GetUser } from '../common/get-user.decorator';
import { AuthGuard } from '@nestjs/passport';

@Controller('charge')
@UseGuards(AuthGuard('jwt'))
export class ChargeController {
  constructor(private chargeService: ChargeService) {}
  private logger = new Logger('ChargeController');

  @Post()
  createCharge(
    @GetUser() user,
    @Body() createChargeDto: CreateChargeDto,
  ): Promise<number> {
    return this.chargeService.createCharge(user, createChargeDto);
  }
}
