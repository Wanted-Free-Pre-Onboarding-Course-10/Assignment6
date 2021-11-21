import { BadRequestException } from '@nestjs/common';
import { USERNAME_DUPLICATE_EXCEPTION_MSG } from '../message/message';

export class UsernameDuplicateException extends BadRequestException {
  constructor() {
    super(400, USERNAME_DUPLICATE_EXCEPTION_MSG);
  }
}
