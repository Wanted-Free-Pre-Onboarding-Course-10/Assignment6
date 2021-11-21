import { Injectable } from '@nestjs/common';
import { SignUpDto } from './dto/sign.up.dto';
import { UsersRepository } from './user.repository';
import { SignInDto } from './dto/sign.in.dto';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UsernameDuplicateException } from '../exception/username_duplicate_excpetion';
import { SIGNUP_SUCCESS_MSG } from '../message/message';
import { LoginFailException } from '../exception/login_fail_exception';

@Injectable()
export class UserService {
  constructor(
    private usersRepository: UsersRepository,
    private jwtService: JwtService,
  ) {}
  async signUp(signUpDto: SignUpDto): Promise<string> {
    if (await this.usersRepository.findUserByName(signUpDto.username)) {
      throw new UsernameDuplicateException();
    }
    await this.usersRepository.signUp(signUpDto);

    return SIGNUP_SUCCESS_MSG;
  }

  async signIn(signInDto: SignInDto): Promise<{ accessToken: string }> {
    const { username, password } = signInDto;
    const user: User = await this.usersRepository.signIn(username);

    if (user && (await bcrypt.compare(password, user.password))) {
      const payload = { username };
      const accessToken = this.jwtService.sign(payload);

      return { accessToken };
    } else throw new LoginFailException();
  }
}
