import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Req,
  Param,
  Body,
  Query
} from '@nestjs/common'
import { BadRequestException } from '@nestjs/common'
import { UsePipes } from '@nestjs/common'
import { ValidationPipe } from '../../common/pipes/validation.pipe'
import { ParseIntPipe } from '../../common/pipes/parse-int.pipe'
import * as moment from 'moment'
import * as mt from 'moment-timezone'

import { OrdersService } from './orders.service'
import { Order } from '../../entities/Order.entity'
import { CreateOrderDto } from './dto/create-order.dto'
import { UpdateOrderDto } from './dto/update-order.dto'

import { User } from '../../entities/User.entity'
import { Shop } from '../../entities/Shop.entity'
import { Item } from '../../entities/Item.entity'
import { UpdateUserDto } from '../users/dto/update-user.dto'
import { UpdateShopDto } from '../shops/dto/update-shop.dto'

import { UsersService } from '../users/users.service'
import { ShopsService } from '../shops/shops.service'
import { ItemsService } from '../items/items.service'
import { CreateItemDto } from '../items/dto/create-item.dto'

@Controller('orders')
export class OrdersController {
  constructor(
    private readonly ordersService: OrdersService,
    private readonly usersService: UsersService,
    private readonly shopsService: ShopsService,
    private readonly itemsService: ItemsService
  ) {}

  @Get()
  async findAll(): Promise<Order[]> {
    return await this.ordersService.findAll()
  }

  @Get('/today/shops/:id/status/:status')
  async findFromShopStatus(
    @Param('id', new ParseIntPipe())
    id,
    @Param('status') status
  ): Promise<Order[]> {
    // const date = moment().local().format('YYYY-MM-DD')
    const date = mt().tz('Europe/Madrid').format('YYYY-MM-DD')

    return await this.ordersService.findFromShopStatus(id, date, status)
  }

  @Get(':id')
  async find(
    @Param('id', new ParseIntPipe())
    id
  ): Promise<Order> {
    return await this.ordersService.find(id)
  }

  @Post()
  @UsePipes(new ValidationPipe())
  async create(@Body() order: CreateOrderDto): Promise<Order> {
    try {
      const anOrder = await this.ordersService.create(order)

      const aUser = await this.usersService.findOne(order.user)
      aUser.orders.push(anOrder as Order)
      console.log(aUser)
      await this.usersService.saveOrder(aUser)

      const aShop = await this.shopsService.findOne(order.shop)
      aShop.orders.push(anOrder)
      console.log(aShop)
      await this.shopsService.saveOrder(aShop)

      return await anOrder
    } catch (error) {
      throw new BadRequestException(error)
    }
  }

  @Post(':id/items')
  @UsePipes(new ValidationPipe())
  async addItemToOrder(
    @Param('id', new ParseIntPipe())
    id,
    @Body() item: CreateItemDto
  ): Promise<Order> {
    try {
      // save item first
      // const anItem = await this.itemsService.create( item )
      const anItem = Object.assign(new Item(), item)
      // then save to order
      return await this.ordersService.addItemToOrder(id, anItem)
    } catch (error) {
      throw new BadRequestException(error)
    }
  }

  @Patch(':id')
  @UsePipes(new ValidationPipe())
  async update(
    @Param('id', new ParseIntPipe())
    id,
    @Body() order: UpdateOrderDto
  ): Promise<Order> {
    try {
      return await this.ordersService.update(id, order)
    } catch (error) {
      throw new BadRequestException(error)
    }
  }

  @Delete(':id')
  async delete(
    @Param('id', new ParseIntPipe())
    id
  ) {
    await this.ordersService.delete(id)
  }

  @Get('/today/shops/:id')
  async findTodayFromShop(
    @Param('id', new ParseIntPipe())
    id
  ): Promise<Order[]> {
    // const date = moment().local().format('YYYY-MM-DD')
    const date = mt().tz('Europe/Madrid').format('YYYY-MM-DD')
    return await this.ordersService.findFromShop(id, date)
  }

  @Get('/today/users/:id')
  async findTodayFromUser(
    @Param('id', new ParseIntPipe())
    id
  ): Promise<Order[]> {
    // const date = moment().local().format('YYYY-MM-DD')
    const date = mt().tz('Europe/Madrid').format('YYYY-MM-DD')
    return await this.ordersService.findFromUser(id, date)
  }

  @Get('/today/users/:userId/shops/:shopId')
  async findTodayFromUserShop(
    @Param('userId', new ParseIntPipe())
    userId,
    @Param('shopId', new ParseIntPipe())
    shopId
  ): Promise<Order[]> {
    // const date = moment().local().format('YYYY-MM-DD')
    const date = mt().tz('Europe/Madrid').format('YYYY-MM-DD')
    return await this.ordersService.findFromUserShop(userId, shopId, date)
  }

  @Get('/fromtoday/users/:userId/shops/:shopId')
  async findFromTodayFromUserShop(
    @Param('userId', new ParseIntPipe())
    userId,
    @Param('shopId', new ParseIntPipe())
    shopId
  ): Promise<Order[]> {
    // const date = moment().local().format('YYYY-MM-DD')
    const date = mt().tz('Europe/Madrid').format('YYYY-MM-DD')
    return await this.ordersService.findFromFromUserShop(userId, shopId, date)
  }

  @Get('/date/shops/:id')
  async findDateFromShop(
    @Param('id', new ParseIntPipe())
    id,
    @Query('day') date
  ): Promise<Order[]> {
    return await this.ordersService.findFromShop(id, date)
  }

}
