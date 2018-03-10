import {
  Controller,
  Get,
  Post,
  Req,
  Param,
  Body,
  Query,
  ForbiddenException,
  BadRequestException,
  Patch,
  Delete
} from '@nestjs/common'
import { UsePipes } from '@nestjs/common'
import { ValidationPipe } from '../../common/pipes/validation.pipe'
import { ParseIntPipe } from '../../common/pipes/parse-int.pipe'

import { ShopsService } from './shops.service'
import { Shop } from '../../entities/Shop.entity'

import { CreateShopDto } from './dto/create-shop.dto'
import { UpdateShopDto } from './dto/update-shop.dto'
import { CreateAdminDto } from '../users/dto/create-admin.dto'
import { AssignShopDto } from '../shops/dto/assign-shop.dto'

@Controller('shops')
export class ShopsController {
  constructor(private readonly shopsService: ShopsService) {}

  @Get()
  async findAll(): Promise<Shop[]> {
    return await this.shopsService.findAll()
  }

  @Get('users')
  async findAllWithUsers(): Promise<Shop[]> {
    return await this.shopsService.findAllWithUsers()
  }

  @Get('products')
  async findAllWithProducts(): Promise<Shop[]> {
    return await this.shopsService.findAllWithProducts()
  }

  @Get(':id/users')
  async findOneWithUsers(
    @Param('id', new ParseIntPipe())
    id
  ) {
    // console.log(id)
    return await this.shopsService.findOneWithUsers(id)
  }

  @Get(':id/products')
  async findOneWithProducts(
    @Param('id', new ParseIntPipe())
    id
  ) {
    // console.log(id)
    return await this.shopsService.findOneWithProducts(id)
  }

  @Get(':id/admins')
  async findOneWithAdmins(
    @Param('id', new ParseIntPipe())
    id
  ) {
    // console.log(id)
    return await this.shopsService.findOneWithAdmins(id)
  }

  @Get(':id/orders')
  async findOneWithOrders(
    @Param('id', new ParseIntPipe())
    id,
    @Query('day') day
  ) {
    // console.log(id)
    return await this.shopsService.findOneWithOrders(id, day)
  }

  @Get(':id')
  async findOne(
    @Param('id', new ParseIntPipe())
    id
  ) {
    // console.log(id)
    return await this.shopsService.findOne(id)
  }

  @Post()
  @UsePipes(new ValidationPipe())
  async create(@Body() shop: CreateShopDto) {
    // throw new ForbiddenException()
    try {
      return await this.shopsService.create(shop)
    } catch (error) {
      throw new BadRequestException(error)
    }
  }

  @Patch(':id')
  @UsePipes(new ValidationPipe())
  async update(
    @Param('id', new ParseIntPipe())
    id,
    @Body() shop: UpdateShopDto
  ) {
    try {
      return await this.shopsService.update(id, shop)
    } catch (error) {
      throw new BadRequestException(error)
    }
  }

  @Delete(':id')
  async delete(
    @Param('id', new ParseIntPipe())
    id
  ) {
    await this.shopsService.delete(id)
  }

  @Post(':id/products')
  // @UsePipes(new ValidationPipe())
  async addProductToShop(
    @Param('id', new ParseIntPipe())
    id,
    @Body() product: AssignShopDto
  ) {
    // throw new ForbiddenException()
    try {
      return await this.shopsService.addProductToShop(id, product)
    } catch (error) {
      throw new BadRequestException(error)
    }
  }

  @Post(':id/admins')
  // @UsePipes(new ValidationPipe())
  async addAdminToShop(
    @Param('id', new ParseIntPipe())
    id,
    @Body() admin: CreateAdminDto
  ) {
    // throw new ForbiddenException()
    try {
      return await this.shopsService.addAdminToShop(id, admin)
    } catch (error) {
      throw new BadRequestException(error)
    }
  }
}
