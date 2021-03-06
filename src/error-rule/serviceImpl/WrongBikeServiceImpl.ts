import { Injectable } from '@nestjs/common';
import { CreateChargeDto } from 'src/charge/dto/create.charge.dto';
import { ErrorRuleService } from '../error-rule.service';
import * as moment from 'moment';
import { WRONG_DEER_MSG } from '../../message/message';

@Injectable()
export class WrongBikeServiceImpl implements ErrorRuleService {
  isApplyError(createChargeDto: CreateChargeDto): {
    message: string;
    payment: number;
  } {
    if (
      createChargeDto.isWrong &&
      this.calculateDiffSeconds(
        createChargeDto.startAt,
        createChargeDto.endAt,
      ) <= 60
    ) {
      const message = WRONG_DEER_MSG;
      return {
        message,
        payment: 0,
      };
    }
    return {
      message: '',
      payment: -1,
    };
  }

  // == 걸린 초 리턴하는 메서드 == //
  private calculateDiffSeconds(startAt: string, endAt: string): number {
    const startMoment = moment(startAt, 'YYYYMMDDHHmm');
    const endMoment = moment(endAt, 'YYYYMMDDHHmm');

    const diffSeconds = moment
      .duration(endMoment.diff(startMoment))
      .asSeconds();

    return diffSeconds;
  }
}
