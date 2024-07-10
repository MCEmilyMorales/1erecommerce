import { Body, ClassSerializerInterceptor, Controller, Get, Post, UseGuards, UseInterceptors } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";

import { AuthService } from "./auth.service";
import { LoginUserDto } from "./loginUser.Dto";
import { CreateUserDto } from "src/users/users.dto";

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get()
  getAuth() {
    return this.authService.getAuth();
  }

  @Post('signin')
  @UseInterceptors()
  signIn(@Body() credential: LoginUserDto) {
    const { email, password } = credential;
    return this.authService.signin(email, password);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Post('signup')
  signUp(@Body() user: CreateUserDto) {
    return this.authService.signUp(user);
  }
}
