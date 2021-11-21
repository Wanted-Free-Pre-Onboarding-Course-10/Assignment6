import { DiscountRuleService } from '../discount-rule.service';
import { ParkingzoneRepository } from '../discount.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, UseGuards } from '@nestjs/common';
import { CreateChargeDto } from '../../charge/dto/create.charge.dto';
import { UsersRepository } from 'src/user/user.repository';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from '../../common/get-user.decorator';
import * as moment from 'moment';
@Injectable()
@UseGuards(AuthGuard)
export class ParkingZoneDiscountServiceImpl implements DiscountRuleService {
  constructor(
    @InjectRepository(ParkingzoneRepository)
    private parkingRepository: ParkingzoneRepository,
    private usersRepository: UsersRepository,
  ) { }

  // 할인 요금제 //
  async discount(
    @GetUser() user,
    createChargeDto: CreateChargeDto,
    finedMoneyResult,
    basic_fee,
  ): Promise<number> {
    const { lat, lng } = createChargeDto;
    const check = await this.parkingRepository.findParkingzoneByLatAmdLng(lat, lng,);
    const startAt = new Date();
    const endtAt = await this.usersRepository.getLastUsedTime(user);
    const startMoment = moment(startAt, 'YYYYMMDDHHmm');
    const endMoment = moment(endtAt, 'YYYYMMDDHHmm');

    const diffMinutes = moment
      .duration(startMoment.diff(endMoment))
      .asMinutes();
    if (diffMinutes < 30) {
      finedMoneyResult = finedMoneyResult - basic_fee;
    }
    if (check) {
      finedMoneyResult = finedMoneyResult * 0.7;
    }
    //사용자 반납시간
    await this.usersRepository.setLastUsedTime(user);
    return finedMoneyResult;
  }
}
