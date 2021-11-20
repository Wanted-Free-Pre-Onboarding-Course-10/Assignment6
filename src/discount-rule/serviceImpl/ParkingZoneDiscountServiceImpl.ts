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
    private usersRepository: UsersRepository
  ) { }

  // 할인 요금제 //
  async discount(@GetUser() user, createChargeDto: CreateChargeDto, price: number) {
    const { lat, lng } = createChargeDto;
    const startAt = new Date();
    // 재사용시간 30분 이내인지 확인
    const endtAt = await this.usersRepository.getLastUsedTime(user)  //jwt 유저 아이디

    const startMoment = moment(startAt, 'YYYYMMDDHHmm');
    const endMoment = moment(endtAt, 'YYYYMMDDHHmm');

    const diffMinutes = moment
      .duration(endMoment.diff(startMoment))
      .asMinutes();

    if (diffMinutes > 30)
      return;
    // 기존 금액 할인하기

    // 파킹존에 위치하는지 확인
    const check = await this.parkingRepository.findParkingzoneByLatAmdLng(lat, lng);
    if (check)
      return price * 0.7;
    return price;
  }
}
