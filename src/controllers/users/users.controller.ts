import {
  Controller,
  Get,
  Post,
  Req,
  Param,
  Body,
  ForbiddenException,
  BadRequestException,
  Patch,
  Delete
} from '@nestjs/common'
import { UsePipes } from '@nestjs/common'
import { ValidationPipe } from '../../common/pipes/validation.pipe'
import { ParseIntPipe } from '../../common/pipes/parse-int.pipe'

import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { AddRoleDto } from './dto/add-role.dto'
import { CreateShopDto } from '../shops/dto/create-shop.dto'

import { UsersService } from './users.service'
import { User } from '../../entities/User.entity'
import { Shop } from '../../entities/Shop.entity'

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async findAll(): Promise<User[]> {
    return await this.usersService.findAll()
  }

  @Get('shops')
  async findWithShops(): Promise<User[]> {
    return await this.usersService.findWithShops()
  }

  @Get(':id')
  async findOne(
    @Param('id', new ParseIntPipe())
    id
  ) {
    // console.log(id)
    return await this.usersService.findOne(id)
  }

  @Get(':id/shops')
  async findOneWithShops(
    @Param('id', new ParseIntPipe())
    id
  ) {
    // console.log(id)
    return await this.usersService.findOneWithShops(id)
  }

  @Get(':id/admins')
  async findOneAdminShop(
    @Param('id', new ParseIntPipe())
    id
  ) {
    // console.log(id)
    return await this.usersService.findOneAdminShop(id)
  }

  @Post(':id/shops')
  @UsePipes(new ValidationPipe())
  async addShopToUser(
    @Param('id', new ParseIntPipe())
    id,
    @Body() shop: CreateShopDto
  ) {
    // throw new ForbiddenException()
    try {
      return await this.usersService.addShopToUser(id, shop)
    } catch (error) {
      throw new BadRequestException(error)
    }
  }

  @Post()
  @UsePipes(new ValidationPipe())
  async create(@Body() user: CreateUserDto) {
    // throw new ForbiddenException()
    try {
      return await this.usersService.create(user)
    } catch (error) {
      throw new BadRequestException(error)
    }
  }

  @Patch(':id')
  @UsePipes(new ValidationPipe())
  async update(
    @Param('id', new ParseIntPipe())
    id,
    @Body() user: UpdateUserDto
  ) {
    try {
      return await this.usersService.update(id, user)
    } catch (error) {
      throw new BadRequestException(error)
    }
  }

  @Post(':id/roles')
  @UsePipes(new ValidationPipe())
  async addRole(
    @Param('id', new ParseIntPipe())
    id,
    @Body() role: AddRoleDto
  ) {
    try {
      return await this.usersService.addRole(id, role)
    } catch (error) {
      throw new BadRequestException(error)
    }
  }

  @Delete(':id')
  async delete(
    @Param('id', new ParseIntPipe())
    id
  ) {
    await this.usersService.delete(id)
  }

  @Delete(':userId/shops/:shopId')
  async removeShopFromUser(
    @Param('userId', new ParseIntPipe())
    userId,
    @Param('shopId', new ParseIntPipe())
    shopId
  ) {
    return await this.usersService.removeShopFromUser(userId, shopId)
  }
}
