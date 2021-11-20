import { BadRequestException } from '@nestjs/common';
import { LANDING_BOUNDARY_EXCEPTION_MSG } from '../message/message';

export class LandingBoundaryException extends BadRequestException {
  constructor() {
    super(400, LANDING_BOUNDARY_EXCEPTION_MSG);
  }
}
