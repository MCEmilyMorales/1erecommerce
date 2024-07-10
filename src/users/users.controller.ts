import {
  Controller,
  Get,
  Put,
  Delete,
  Param,
  Body,
  UseInterceptors,
  Query,
  UseGuards,
  ParseUUIDPipe,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiParam,
  ApiTags,
  PartialType,
} from '@nestjs/swagger';

import { UsersService } from './users.service';
import { HideCredentialsAndRolInterceptor } from 'src/interceptors/hide-credential.interceptor';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { CreateUserDto, UpdateUserDto } from './users.dto';
import { Roles } from 'src/decorators/roles.decorator';
import { Role } from 'src/roles.enum';
import { RolesGuard } from 'src/auth/guards/roles.guard';

@ApiTags('users')
@Controller('users')
@UseGuards(AuthGuard) //*para proteger todas las rutas con guardianes
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiBearerAuth()
  @Get()
  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  @UseInterceptors(HideCredentialsAndRolInterceptor)
  getUsers(
    @Query('page') page: string = '1',
    @Query('limit') limit: string = '5',
  ) {
    return this.usersService.getUsers(Number(page), Number(limit));
  }

  @ApiBearerAuth()
  @Get(':id')
  @UseGuards(AuthGuard)
  @UseInterceptors(HideCredentialsAndRolInterceptor)
  getUserById(@Param('id', ParseUUIDPipe) id: string) {
    return this.usersService.getUserById(id);
  }

  @ApiBearerAuth()
  @Put(':id')
  @UseGuards(AuthGuard)
  @UseInterceptors(HideCredentialsAndRolInterceptor)
  @ApiParam({ name: 'id', type: 'string', description: 'Id del usuario' })
  @ApiBody({
    type: PartialType(CreateUserDto),
    description: 'Datos de usuario actualizados',
  })
  updateUser(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updatedUser: Partial<UpdateUserDto>,
  ) {
    return this.usersService.updateUser(id, updatedUser);
  }

  @ApiBearerAuth()
  @Delete(':id')
  @UseInterceptors(HideCredentialsAndRolInterceptor)
  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  deleteUser(@Param('id', ParseUUIDPipe) id: string) {
    return this.usersService.deleteUser(id);
  }
}
