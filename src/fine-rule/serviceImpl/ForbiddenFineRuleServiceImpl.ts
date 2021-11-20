import { FineRuleService } from '../fine-rule.service';
import { Injectable } from '@nestjs/common';
import { CreateChargeDto } from 'src/charge/dto/create.charge.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ForbiddenAreaRepository } from '../fine-rule.repository';
import { DeerRepository } from 'src/deer/deer.repository';

@Injectable()
export class ForbiddenFineRuleServiceImpl implements FineRuleService {
  constructor(
    @InjectRepository(ForbiddenAreaRepository)
    private forbiddenAreaRepository: ForbiddenAreaRepository,
    @InjectRepository(DeerRepository)
    private deerRepository: DeerRepository) { }
  
  
  async applyFine(basicPayment: number, createChargeDto: CreateChargeDto) {
    const { lat, lng, startAt, endAt, boardName } = createChargeDto;

    const currentArea = await this.forbiddenAreaRepository.currentArea(lat, lng);
    const originalArea = await this.deerRepository.findbyBoardId(boardName);

    // const forbiddenArea = await this.forbiddenAreaRepository.findAreaByLatAndLng(lat, lng);
    console.log('11111111',originalArea[0].area_center.x);
    const distanceFromOriginalArea = Math.sqrt(Math.pow((originalArea[0].area_center.x - parseInt(lat)), 2) + Math.pow((originalArea[0].area_center.y - parseInt(lng)), 2));
    console.log(distanceFromOriginalArea);

    // if (currentArea.id === originalArea.id) {
    //   if (forbiddenArea) {
    //     let payment = basicPayment + 6000
    //     return payment;
    //   } else {
    //     return basicPayment;
    //   }
    // } else {
    //   if (forbiddenArea) {
        // let payment = basicPayment + 500 * distanceFromOriginalArea + 6000 
    //     // return payment;
    //   } else {
        // let payment = basicPayment + 500 * distanceFromOriginalArea
        // return payment;
    //   }
    // }
  }
}
