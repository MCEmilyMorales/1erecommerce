import { PickType } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';
import { CreateUserDto } from 'src/users/users.dto';

export class LoginUserDto extends PickType(CreateUserDto, [
  'email',
  'password',
]){}
