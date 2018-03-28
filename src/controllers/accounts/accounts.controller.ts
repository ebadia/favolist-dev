import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Req,
  Res,
  Param,
  Body
} from '@nestjs/common'
import {
  ForbiddenException,
  BadRequestException,
  HttpCode,
  HttpStatus
} from '@nestjs/common'

import { LoginUserDto } from './dto/login-user.dto'
import { AccountsService } from './accounts.service'
import { User } from '../../entities/User.entity'
import { CreateUserDto } from '../users/dto/create-user.dto'

@Controller('accounts')
export class AccountsController {
  constructor(private readonly accountsService: AccountsService) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() user: LoginUserDto, @Res() res) {
    try {
      const response = await this.accountsService.login(user)
      const theUser = await this.accountsService.findOne(user)
      return res
        .set('Access-Control-Expose-Headers', 'Authorization')
        .set('Authorization', 'Bearer ' + response.access_token)
        .send(theUser)
    } catch (error) {
      throw new BadRequestException(error)
    }
  }

  @Post()
  @HttpCode(HttpStatus.OK)
  async create(@Body() user: CreateUserDto) {
    try {
      return await this.accountsService.create(user)
    } catch (error) {
      throw new BadRequestException(error)
    }
  }

  @Get('authorized')
  async authorized() {
    return 'Authorized route...!'
  }

  @Get('username/:username')
  async findUserName(@Param('username') username): Promise<User[]> {
    return await this.accountsService.findUserName(username)
  }
}
