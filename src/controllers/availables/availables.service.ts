import { Component } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

// import { Cat } from './interfaces/cat.interface';
import { AvailablesModule } from './availables.module'
import { Available } from '../../entities/Available.entity'
import { User } from '../../entities/User.entity'
import { Product } from '../../entities/Product.entity'

import { CreateAvailableDto } from './dto/create-available.dto'
import { UpdateAvailableDto } from './dto/update-available.dto'
import { AssignProductDto } from '../products/dto/assign-product.dto'

@Component()
export class AvailablesService {
  constructor(
    @InjectRepository(Available)
    private readonly availablesRepo: Repository<Available>
  ) {}

  async findAll(): Promise<Available[]> {
    return await this.availablesRepo.find({ relations: ['product'] })
  }

  async findOne(id: number): Promise<Available> {
    // I can do this because I have added option { select: false } in @Column for password
    return await this.availablesRepo.findOneById(id, { relations: ['product'] })
  }

  async findOneWithProduct(id: number): Promise<Available> {
    // I can do this because I have added option { select: false } in @Column for password
    return await this.availablesRepo.findOneById(id, { relations: ['product'] })
  }

  async create(product: CreateAvailableDto): Promise<Available> {
    // if product exists on available the same day return
    const exists = await this.availablesRepo.query(`
        SELECT * FROM available
         WHERE "available"."productId" = ${product.product.id}
         AND available.day = '${product.day}'
        ;
    `)
    // exists is an array returned from the query
    if (exists.length === 0) {
      const aProduct = Object.assign(new Available(), product)
      return await this.availablesRepo.save(aProduct)
    } else {
      return null
    }
  }

  async update(id: number, product?: UpdateAvailableDto): Promise<Available> {
    const aProduct = Object.assign(new Available(), product)
    await this.availablesRepo.updateById(id, aProduct)
    return await this.availablesRepo.findOneById(id)
  }

  async delete(id: number): Promise<void> {
    await this.availablesRepo
      .createQueryBuilder()
      .delete()
      .where('id=:id', { id })
      .execute()
  }

  async findFromShop(id: number, date: string): Promise<Available> {
    // return await Available.getAvailablesByShop( id, null )
    return await this.availablesRepo.query(`
          SELECT
          "available"."id" AS "availableId",
          "available"."price" AS "availablePrice",
          "available"."day",
          "available"."stock",
          "available"."stockOut",
          "available"."productId",
          "product".*,
          "shop"."name" AS "shop",
          "shop"."id" AS "shopid"
          FROM
          "available"
          LEFT JOIN "product"
          ON "available"."productId" = "product"."id"
          LEFT JOIN "shop"
          ON "product"."shopId" = "shop"."id"
          WHERE
          "shop"."id" = ${id}
          AND "available"."day" = '${date}'
        ;
        `)
  }
}
