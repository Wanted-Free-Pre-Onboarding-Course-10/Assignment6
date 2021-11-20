import { Injectable, UnauthorizedException } from '@nestjs/common';
import { SignUpDto } from './dto/sign.up.dto';
import { UsersRepository } from './user.repository';
import { SignInDto } from './dto/sign.in.dto';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
  constructor(
    private usersRepository: UsersRepository,
    private jwtService: JwtService,
  ) {}
  signUp(signUpDto: SignUpDto) {
    return this.usersRepository.signUp(signUpDto);
  }

  async signIn(signInDto: SignInDto) {
    const { username, password } = signInDto;
    const user: User = await this.usersRepository.signIn(username);

    if (user && (await bcrypt.compare(password, user.password))) {
      const payload = { username };
      const accessToken = this.jwtService.sign(payload);

      return { accessToken };
    } else throw new UnauthorizedException('logIn failed');
  }
}
