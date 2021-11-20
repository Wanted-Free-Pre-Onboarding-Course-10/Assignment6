import { Body, Controller, Post } from '@nestjs/common';
import { SignUpDto } from './dto/sign.up.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('sign-up')
  signUp(@Body() signUpDto: SignUpDto) {
    console.log(signUpDto);
    return this.userService.signUp(signUpDto);
  }
}
