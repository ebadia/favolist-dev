import { Component } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { ItemsModule } from './items.module'
import { Item } from '../../entities/Item.entity'
import { CreateItemDto } from './dto/create-item.dto'
import { UpdateItemDto } from './dto/update-item.dto'

import { User } from '../../entities/User.entity'
import { Shop } from '../../entities/Shop.entity'
import { UpdateUserDto } from '../users/dto/update-user.dto'
import { UpdateShopDto } from '../shops/dto/update-shop.dto'

@Component()
export class ItemsService {

  constructor(
    @InjectRepository(Item)
    private readonly itemsRepo: Repository<Item>
  ) {}

  async findAll(): Promise<Item[]> {
    // return await this.itemsRepo.find( {relations: ["product"]} )
    return await this.itemsRepo.createQueryBuilder('item')
      .leftJoinAndSelect('item.product', 'product')
      .getMany()
  }

  async find( id: number ): Promise<Item> {
    // return await this.itemsRepo.findOneById( id, {relations: ["product"]} )
    return await this.itemsRepo.createQueryBuilder('item')
      .leftJoinAndSelect('item.product', 'product')
      .where( 'item.id = :id', {id})
      .getOne()
  }

  async create( item: CreateItemDto ): Promise<Item> {
    const anItem = Object.assign( new Item, item )
    return await this.itemsRepo.save( anItem )
  }

  async update( id: number, item: UpdateItemDto ): Promise<Item> {
    const anItem = Object.assign( new Item, item )
    await this.itemsRepo.updateById( id, anItem )
    return await this.itemsRepo.findOneById( id )
  }

  async delete( id: number ) {
    await this.itemsRepo.removeById( id )
  }

}
