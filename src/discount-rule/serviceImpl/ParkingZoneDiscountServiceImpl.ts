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
  async discount(createChargeDto: CreateChargeDto) {
    const { lat, lng } = createChargeDto;
    // 파킹존에 위치하는지 확인
    const check = await this.parkingRepository.findParkingzoneByLatAmdLng(lat, lng);
    if (check)
      return;
    //return 할인 가격
    //return 그냥 가격
  }
}
