import { Injectable } from '@nestjs/common';
import { SignUpDto } from './dto/sign.up.dto';
import { UsersRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(private usersRepository: UsersRepository) {}
  signUp(signUpDto: SignUpDto) {
    return this.usersRepository.signUp(signUpDto);
  }
}
