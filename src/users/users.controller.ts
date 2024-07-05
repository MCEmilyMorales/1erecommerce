import { Controller, Get, Post, Put, Delete, Param, Body, UseInterceptors, Query, UseGuards, ParseUUIDPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { HideCredentialInterceptor } from 'src/interceptors/hide-credential.interceptor';
import { User as UserFack} from './fackUsers.interface';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { CreateUserDto } from './users.dto';
import { Roles } from 'src/decorators/roles.decorator';
import { Role } from 'src/roles.enum';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiBearerAuth()
  @Get()
  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  getUsers(
    @Query('page') page: string = '1',
    @Query('limit') limit: string = '5',
  ) {
    return this.usersService.getUsers(Number(page), Number(limit));
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  @UseInterceptors(HideCredentialInterceptor)
  getUserById(@Param('id', ParseUUIDPipe) id: string) {
    return this.usersService.getUserById(id);
  }

  // @UseInterceptors(HideCredentialInterceptor)
  // @Post()
  // async createUser(@Body() user: CreateUserDto) {
  //   return await this.usersService.createUser(user);
  // }

  @Put(':id')
  @UseGuards(AuthGuard)
  updateUser(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updatedUser: Partial<CreateUserDto>,
  ) {
    return this.usersService.updateUser(id, updatedUser);
  }

  @ApiBearerAuth()
  @Delete(':id')
  @UseGuards(AuthGuard)
  deleteUser(@Param('id', ParseUUIDPipe) id: string) {
    return this.usersService.deleteUser(id);
  }
}

/*

@UseGuards(AuthGuard)
  @Get()
  getUser(
    @Query('page') page: string = '1',
    @Query('limit') limit: string = '5',
  ) {
    return this.usersService.getUsers(Number(page), Number(limit));
  }

  @UseGuards(AuthGuard)
  @UseInterceptors(HideCredentialInterceptor)
  @Get(':id')
  getUserById(@Param('id') id: string) {
    return this.usersService.getUserById(id);
  }

  @UseInterceptors(HideCredentialInterceptor)
  @Post()
  createUser(@Body() user) {
    return this.usersService.createUser(user);
  }

  @UseGuards(AuthGuard)
  @Put(':id')
  updateUser(
    @Param('id') id: string,
    @Body() updatedUser: Partial<UserFack[]>,
  ) {
    return this.usersService.updateUser(id, updatedUser);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  deleteUser(@Param('id') id: string) {
    return this.usersService.deleteUser(id);
  }
 */