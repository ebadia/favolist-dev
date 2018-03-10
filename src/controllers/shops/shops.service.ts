import { Component } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

// import { Cat } from './interfaces/cat.interface';
import { ShopsModule } from './shops.module'
import { Shop } from '../../entities/Shop.entity'
import { User } from '../../entities/User.entity'
import { Product } from '../../entities/Product.entity'

import { CreateShopDto } from './dto/create-shop.dto'
import { UpdateShopDto } from './dto/update-shop.dto'
import { CreateAdminDto } from '../users/dto/create-admin.dto'
import { AssignShopDto } from '../shops/dto/assign-shop.dto'

@Component()
export class ShopsService {
  constructor(
    @InjectRepository(Shop) private readonly shopsRepo: Repository<Shop>
  ) {}

  async findAll(): Promise<Shop[]> {
    return await this.shopsRepo.find()
  }

  async findAllWithUsers(): Promise<Shop[]> {
    return await this.shopsRepo.find({ relations: ['users'] })
  }

  async findAllWithProducts(): Promise<Shop[]> {
    return await this.shopsRepo.find({ relations: ['products'] })
  }

  async findOne(id: number): Promise<Shop> {
    // I can do this because I have added option { select: false } in @Column for password
    return await this.shopsRepo.findOneById(id, { relations: ['orders'] })
  }

  async findOneWithUsers(id: number): Promise<Shop> {
    // I can do this because I have added option { select: false } in @Column for password
    return await this.shopsRepo.findOneById(id, { relations: ['users'] })
  }

  async findOneWithProducts(id: number): Promise<Shop> {
    // I can do this because I have added option { select: false } in @Column for password
    return await this.shopsRepo.findOneById(id, {
      relations: ['products', 'products.days']
    })
  }

  async create(shop: CreateShopDto): Promise<CreateShopDto> {
    return await this.shopsRepo.save(shop)
  }

  async update(id: number, shop?: UpdateShopDto): Promise<UpdateShopDto> {
    await this.shopsRepo.updateById(id, shop)
    return await this.shopsRepo.findOneById(id)
  }

  async delete(id: number): Promise<void> {
    await this.shopsRepo
      .createQueryBuilder()
      .delete()
      .where('id=:id', { id })
      .execute()
  }

  async findOneWithAdmins(id: number): Promise<Shop> {
    return await this.shopsRepo.findOneById(id, { relations: ['admins'] })
  }

  async findOneWithOrders(id: number, day: string): Promise<Shop> {
    return await this.shopsRepo.findOneById(id, {
      where: { Orders_day: day },
      relations: ['orders', 'orders.items', 'items.product']
    })
  }

  async addProductToShop(id: number, product: AssignShopDto): Promise<Shop> {
    const shop = await this.shopsRepo.findOneById(id, {
      relations: ['products']
    })
    // let obj = Object.assign( new Product(), product )
    // shop.admins.push(obj)
    shop.products.push(product as Product)
    await this.shopsRepo.save(shop)
    return await this.shopsRepo.findOneById(id, { relations: ['products'] })
  }

  async addAdminToShop(id: number, admin: CreateAdminDto): Promise<Shop> {
    const shop = await this.shopsRepo.findOneById(id, { relations: ['admins'] })
    const obj = Object.assign(new User(), admin)
    // shop.admins.push(obj)
    shop.admins.push(admin as User)
    await this.shopsRepo.save(shop)
    return await this.shopsRepo.findOneById(id, { relations: ['admins'] })
  }

  async removeAdminFromShop(shopId: number, userId: number): Promise<Shop> {
    const shop = await this.shopsRepo.findOneById(shopId, {
      relations: ['admins']
    })
    const obj = shop.admins.filter(o => {
      return !(o.id === shopId)
    })
    shop.admins = obj
    await this.shopsRepo.save(shop)
    return await this.shopsRepo.findOneById(shopId, { relations: ['admins'] })
  }

  async saveOrder(shop: Shop): Promise<Shop> {
    return await this.shopsRepo.save(shop)
  }
}
