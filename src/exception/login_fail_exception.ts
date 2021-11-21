import { BadRequestException } from '@nestjs/common';
import { LOGIN_FAIL_EXCEPTION_MSG } from '../message/message';

export class LoginFailException extends BadRequestException {
  constructor() {
    super(400, LOGIN_FAIL_EXCEPTION_MSG);
  }
}
