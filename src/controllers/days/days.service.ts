import { Component } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  WsResponse
} from '@nestjs/websockets'

import { Day } from '../../entities/Day.entity'
import { CreateDayDto } from './dto/create-day.dto'
import { UpdateDayDto } from './dto/update-day.dto'


@Component()
@WebSocketGateway()
export class DaysService {
  @WebSocketServer() server

  constructor(
    @InjectRepository(Day) private readonly repo: Repository<Day>
  ) {}

  async findAll(): Promise<Day[]> {
    return await this.repo
      .createQueryBuilder('day')
      .leftJoinAndSelect('day.product', 'product')
      .getMany()
  }

  async find(id: number): Promise<Day> {
    // return await this.repo.findOneById( id, {relations: ["product"]} )
    return await this.repo
      .createQueryBuilder('day')
      .leftJoinAndSelect('day.product', 'product')
      .where('day.id = :id', { id })
      .getOne()
  }

  async create(day: CreateDayDto): Promise<Day> {
    const anDay = Object.assign(new Day(), day)
    return await this.repo.save(anDay)
  }

  async update(id: number, day: UpdateDayDto): Promise<Day> {
    const anDay = Object.assign(new Day(), day)
    await this.repo.updateById(id, anDay)
    const upatedDay = await this.repo.findOneById(id)
    //
    return upatedDay
  }

  async delete(id: number) {
    const item = await this.repo.findOneById(id)
    await this.repo.remove(item)
  }

  // **************************
  // Socket Message Subscribers
  // **************************
  // @SubscribeMessage('day ready')
  // onDayReady(client, data): WsResponse<any> {
  //   const event = 'day ready'
  //   console.log(
  //     '---------------------------- HA LLEGADO UN MENSAJE PARA TI DE ITEM READY'
  //   )
  //
  //   return { event, data }
  // }
}
