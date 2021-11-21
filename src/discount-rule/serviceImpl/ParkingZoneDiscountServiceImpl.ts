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
  ) {}

  // 할인 요금제 //
  async discount(
    @GetUser() user,
    createChargeDto: CreateChargeDto,
    finedMoneyResult: { basicPayment: number; reason: string },
    basic_fee,
  ): Promise<{ finedMoneyResult: number; message: string }> {
    const { lat, lng } = createChargeDto;
    const check = await this.parkingRepository.findParkingzoneByLatAmdLng(
      lat,
      lng,
    );
    const startAt = new Date();
    const endtAt = await this.usersRepository.getLastUsedTime(user);
    const startMoment = moment(startAt, 'YYYYMMDDHHmm');
    const endMoment = moment(endtAt, 'YYYYMMDDHHmm');
    let message = '';

    const diffMinutes = moment
      .duration(startMoment.diff(endMoment))
      .asMinutes();

    if (diffMinutes < 30) {
      finedMoneyResult.basicPayment = finedMoneyResult.basicPayment - basic_fee;
      message += '재사용 시간 30분 미만. ';
    }

    if (check[0]) {
      finedMoneyResult.basicPayment = finedMoneyResult.basicPayment * 0.7;
      message += '주차 구역 주차.';
    }
    await this.usersRepository.setLastUsedTime(user);
    return {
      finedMoneyResult: finedMoneyResult.basicPayment,
      message: message,
    };
  }
}
