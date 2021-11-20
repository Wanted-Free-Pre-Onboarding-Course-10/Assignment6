import { DiscountRuleService } from '../discount-rule.service';
import { ParkingzoneRepository } from '../discount.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { CreateChargeDto } from '../../charge/dto/create.charge.dto';
@Injectable()
export class ParkingZoneDiscountServiceImpl implements DiscountRuleService {
  constructor(
    @InjectRepository(ParkingzoneRepository)
    private parkingRepository: ParkingzoneRepository,
  ) { }

  // 할인 요금제 //
  async discount(createChargeDto: CreateChargeDto, price: number) {
    const { lat, lng } = createChargeDto;

    // 재사용시간 30분 이내인지 확인


    // 파킹존에 위치하는지 확인
    const check = await this.parkingRepository.findParkingzoneByLatAmdLng(lat, lng);
    if (check)
      return price * 0.7;
    return price;
  }
}
