import { Component } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { OrdersModule } from './orders.module'
import { Order } from '../../entities/Order.entity'
import { CreateOrderDto } from './dto/create-order.dto'
import { UpdateOrderDto } from './dto/update-order.dto'

import { User } from '../../entities/User.entity'
import { Shop } from '../../entities/Shop.entity'
import { UpdateUserDto } from '../users/dto/update-user.dto'
import { UpdateShopDto } from '../shops/dto/update-shop.dto'
import { Item } from '../../entities/Item.entity'
import { CreateItemDto } from '../items/dto/create-item.dto'

@Component()
export class OrdersService {
  constructor(
    @InjectRepository(Order) private readonly ordersRepo: Repository<Order>
  ) {}

  async findAll(): Promise<Order[]> {
    return await this.ordersRepo.find({
      relations: ['user', 'shop', 'items', 'items.product']
    })
  }

  async find(id: number): Promise<Order> {
    const total = await Order.getOrderTotal(id)
    const order = await this.ordersRepo.findOneById(id, {
      relations: ['items', 'items.product']
    })
    return Object.assign(order, { total: total[0].sum })
    // return await this.ordersRepo.findOneById( id, { relations: ['items', 'items.product']})
  }

  async create(order: CreateOrderDto): Promise<Order> {
    const anOrder = Object.assign(new Order(), order)
    return await this.ordersRepo.save(anOrder)
  }

  async update(id: number, order: UpdateOrderDto): Promise<Order> {
    const anOrder = Object.assign(new Order(), order)
    await this.ordersRepo.updateById(id, anOrder)
    return await this.ordersRepo.findOneById(id)
  }

  async delete(id: number) {
    await this.ordersRepo.removeById(id)
  }

  async findFromShop(id: number, date: string): Promise<Order[]> {
    //
    return await this.ordersRepo
      .createQueryBuilder('order')
      .leftJoinAndSelect('order.user', 'user')
      .leftJoinAndSelect('order.items', 'items')
      .leftJoinAndSelect('items.product', 'product')
      .where('order.shop.id=:id', { id })
      .andWhere('order.day=:date', { date })
      .getMany()

    /*
    return await this.ordersRepo.query(`
        SELECT
          'order'.'day',
          'order'.'hour',
          'order'.'status',
          'order'.'shopId',
          'order'.'userId',
          'user'.'first_name',
          'user'.'last_name',
          'shop'.'name'
        FROM
          'order'
        JOIN 'shop'
          ON 'order'.'shopId' = 'shop'.'id'
        JOIN 'user'
          ON 'order'.'userId' = 'user'.'id'
        WHERE 'shop'.'id' = ${id}
        AND 'order'.'day' = '${date}'
        ;
        `)
        */
  }

  async addItemToOrder(id: number, item: Item): Promise<Order> {
    const order = await this.ordersRepo.findOneById(id, {
      relations: ['items']
    })
    order.items.push(item)
    await this.ordersRepo.save(order)
    return await this.ordersRepo.findOneById(id, { relations: ['items'] })
  }

  async findFromUser(id: number, date: string): Promise<Order[]> {
    //
    return await this.ordersRepo
      .createQueryBuilder('order')
      .leftJoinAndSelect('order.shop', 'shop')
      .leftJoinAndSelect('order.items', 'items')
      .leftJoinAndSelect('items.product', 'product')
      .where('order.user.id=:id', { id })
      .andWhere('order.day=:date', { date })
      .getMany()
  }

  async findFromUserShop(
    userId: number,
    shopId: number,
    date: string
  ): Promise<Order[]> {
    //
    return await this.ordersRepo
      .createQueryBuilder('order')
      .leftJoinAndSelect('order.shop', 'shop')
      .leftJoinAndSelect('order.user', 'user')
      .leftJoinAndSelect('order.items', 'items')
      .leftJoinAndSelect('items.product', 'product')
      .where('order.user.id=:userId', { userId })
      .andWhere('order.shop.id=:shopId', { shopId })
      .andWhere('order.day=:date', { date })
      .getMany()
  }
}
