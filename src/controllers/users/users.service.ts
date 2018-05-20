import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

// import { Cat } from './interfaces/cat.interface';
import { UsersModule } from './users.module'
import { User } from '../../entities/User.entity'
import { Shop } from '../../entities/Shop.entity'

import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { AddRoleDto } from './dto/add-role.dto'
import { CreateShopDto } from '../shops/dto/create-shop.dto'

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly usersRepo: Repository<User>
  ) {}

  async findAll(): Promise<User[]> {
    return await this.usersRepo.find()
  }

  async findOne(id: number): Promise<User> {
    // I can do this because I have added option { select: false } in @Column for password
    return await this.usersRepo.findOne(id, { relations: ['orders'] })
  }

  async create(user: CreateUserDto): Promise<CreateUserDto> {
    return await this.usersRepo.save(user)
  }

  async update(id: number, user?: UpdateUserDto): Promise<User> {
    await this.usersRepo
      .createQueryBuilder()
      .update(User)
      .set(user)
      .where('id=:id', { id })
      .execute()

    return await this.usersRepo.findOne(id)
  }

  async addRole(id: number, role: AddRoleDto): Promise<User> {
    await this.usersRepo
      .createQueryBuilder()
      .relation(User, 'roles')
      .of(id)
      .add(role.id)

    return await this.usersRepo.findOne(id)
  }

  async addShopToUser(id: number, shop: CreateShopDto): Promise<User> {
    const user = await this.usersRepo.findOne(id, { relations: ['shops'] })
    const aShop = Object.assign(new Shop(), shop)
    user.shops.push(aShop)
    await this.usersRepo.save(user)
    return await this.usersRepo.findOne(id, { relations: ['shops'] })
  }

  async removeShopFromUser(userId: number, shopId: number): Promise<User> {
    const user = await this.usersRepo.findOne(userId, {
      relations: ['shops']
    })
    const aShop = user.shops.filter(obj => {
      return !(obj.id === shopId)
    })
    user.shops = aShop
    await this.usersRepo.save(user)
    return await this.usersRepo.findOne(userId, { relations: ['shops'] })
  }

  async delete(id: number): Promise<void> {
    const user = await this.usersRepo.findOne(id)
    await this.usersRepo.remove(user)

    // await this.usersRepo
    //   .createQueryBuilder()
    //   .delete()
    //   .where('id=:id', { id })
    //   .execute()
  }

  async findWithShops(): Promise<User[]> {
    return await this.usersRepo.find({ relations: ['shops'] })
  }

  async findOneWithShops(id: number): Promise<User> {
    return await this.usersRepo.findOne(id, { relations: ['shops'] })
  }

  async findOneAdminShop(id: number): Promise<User> {
    return await this.usersRepo.findOne(id, { relations: ['shop'] })
  }

  async saveOrder(user: User): Promise<User> {
    return await this.usersRepo.save(user)
  }
}
