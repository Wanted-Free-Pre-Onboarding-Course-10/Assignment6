import { Body, Controller, Post } from '@nestjs/common';
import { SignUpDto } from './dto/sign.up.dto';
import { UserService } from './user.service';
import { SignInDto } from './dto/sign.in.dto';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('sign-up')
  signUp(@Body() signUpDto: SignUpDto): Promise<string> {
    return this.userService.signUp(signUpDto);
  }

  @Post('sign-in')
  signIn(@Body() signInDto: SignInDto): Promise<{ accessToken: string }> {
    return this.userService.signIn(signInDto);
  }
}
