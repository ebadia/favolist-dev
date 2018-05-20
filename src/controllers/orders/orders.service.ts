import { Injectable, Inject } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository, Connection } from 'typeorm'
import {
  WebSocketGateway,
  SubscribeMessage,
  WsResponse,
  WebSocketServer,
  WsException
} from '@nestjs/websockets'
import { Observable } from 'rxjs/Observable'
import 'rxjs/add/observable/from'
import 'rxjs/add/operator/map'

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

@Injectable()
@WebSocketGateway()
export class OrdersService {
  @WebSocketServer() server

  constructor(
    @InjectRepository(Order) private readonly ordersRepo: Repository<Order>,
    private _conection: Connection
  ) {}

  async findAll(): Promise<Order[]> {
    return await this.ordersRepo.find({
      relations: ['user', 'shop', 'items', 'items.product']
    })
  }

  async findAllByStatus(status: string): Promise<Order[]> {
    return await this.ordersRepo.find({
      where: { status },
      relations: ['user', 'shop', 'items', 'items.product']
    })
  }

  async find(id: number): Promise<Order> {
    console.log('GET CONTROLLER')
    const total = await Order.getOrderTotal(id)
    const order = await this.ordersRepo.findOne(id, {
      relations: ['items', 'items.product']
    })

    return Object.assign(order, {
      total: total[0].sum
    })
    // return await this.ordersRepo.findOne( id, { relations: ['items', 'items.product']})
  }

  async create(order: CreateOrderDto): Promise<Order> {
    const anOrder = Object.assign(new Order(), order)
    // send message to socket
    this.server.emit('new order', { event: 'new order', data: anOrder })
    //
    //
    return await this.ordersRepo.save(anOrder)
  }

  async update(id: number, order: UpdateOrderDto): Promise<Order> {
    const anOrder = Object.assign(new Order(), order)
    await this.ordersRepo.update(id, anOrder)
    return await this.ordersRepo.findOne(id)
  }

  async delete(id: number) {
    // await this.ordersRepo.removeById(id)
    const anOrder = await this.ordersRepo.findOne(id)
    await this.ordersRepo.remove(anOrder)
  }

  async findFromShop(id: number, date: string): Promise<Order[]> {
    //
    const finded = await this.ordersRepo
      .createQueryBuilder('order')
      .leftJoinAndSelect('order.user', 'user')
      .leftJoinAndSelect('order.items', 'items')
      .leftJoinAndSelect('items.product', 'product')
      .where('order.shop.id=:id', {
        id
      })
      .andWhere('order.day=:date', {
        date
      })
      .getMany()

    // send message to socket
    this.server.emit('today orders', { event: 'today orders', data: true })
    //

    return finded
  }

  async findFromShopStatus(
    id: number,
    date: string,
    status: string
  ): Promise<Order[]> {
    //
    const finded = await this.ordersRepo
      .createQueryBuilder('order')
      .leftJoinAndSelect('order.user', 'user')
      .leftJoinAndSelect('order.items', 'items')
      .leftJoinAndSelect('items.product', 'product')
      .where('order.shop.id=:id', {
        id
      })
      .andWhere('order.day=:date', {
        date
      })
      .andWhere('order.status=:status', {
        status
      })
      .getMany()

    // send message to socket
    this.server.emit('today orders', { event: 'today orders', data: true })
    //

    return finded
  }

  async addItemToOrder(id: number, item: Item): Promise<Order> {
    const order = await this.ordersRepo.findOne(id, {
      relations: ['items']
    })
    order.items.push(item)
    await this.ordersRepo.save(order)
    return await this.ordersRepo.findOne(id, { relations: ['items'] })
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

  async findFromFromUserShop(
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
      .andWhere('order.day>=:date', { date })
      .getMany()
  }

  async dashboard(date: string): Promise<any> {
    return await this._conection.query(
      `SELECT * from dashboard WHERE day = '${date}'`
    )
  }

  // **************************
  // Socket Message Subscribers
  // **************************
  @SubscribeMessage('new order')
  onCreateOrder(client, data): WsResponse<any> {
    const event = 'new order'
    return { event, data: true }
  }
  @SubscribeMessage('today orders')
  onTodayOrders(client, data): WsResponse<any> {
    const event = 'new order'
    return { event, data: true }
  }
}
