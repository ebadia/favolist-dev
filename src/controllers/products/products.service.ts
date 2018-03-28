import { Category } from './../../entities/Category.entity'
import { Component } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Connection, Repository } from 'typeorm'
import * as moment from 'moment'

// import { Cat } from './interfaces/cat.interface';
import { ProductsModule } from './products.module'
import { Product } from '../../entities/Product.entity'
import { CreateProductDto } from './dto/create-product.dto'
import { CreateProductOrderDto } from './dto/create-product-order.dto'
import { Day } from '../../entities/Day.entity'

@Component()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productsRepo: Repository<Product>,
    private _connection: Connection
  ) {}

  async findAll(): Promise<Product[]> {
    return await this.productsRepo.find({
      select: ['id', 'name', 'price', 'description', 'image']
    })
  }

  async findOne(id: number): Promise<Product> {
    return await this.productsRepo.findOneById(id, {
      select: ['id', 'name', 'price', 'description', 'image'],
      relations: ['days']
    })
  }

  async findAllDays(): Promise<Product[]> {
    return await this.productsRepo.find({
      select: ['id', 'name', 'price', 'description', 'image'],
      relations: ['days']
    })
  }

  async getAllDays(): Promise<any[]> {
    return await this._connection
      .getRepository(Day)
      .createQueryBuilder('days')
      .getMany()
  }

  async findAllShops(): Promise<Product[]> {
    return await this.productsRepo.find({
      select: ['id', 'name', 'price', 'description', 'image'],
      relations: ['shop']
    })
  }

  async create(product: CreateProductDto): Promise<Product> {
    const aProduct = Object.assign(new Product(), product)
    return await this.productsRepo.save(aProduct)
  }

  async addDays(id: number, day: any): Promise<Product> {
    const product = await this.productsRepo.findOneById(id, {
      relations: ['days']
    })
    const aDay = Object.assign(new Day(), day)
    product.days.push(aDay)
    await this.productsRepo.save(product)
    return await this.productsRepo.findOneById(id, { relations: ['days'] })
  }

  async addCategories(id: number, category: any): Promise<Product> {
    const product = await this.productsRepo.findOneById(id, {
      relations: ['categories']
    })
    const aCategory = Object.assign(new Category(), category)
    product.categories.push(aCategory)
    await this.productsRepo.save(product)
    return await this.productsRepo.findOneById(id, {
      relations: ['categories']
    })
  }

  async update(id: number, product?: Product): Promise<Product> {
    const aProduct = Object.assign(new Product(), product)
    await this.productsRepo.updateById(id, aProduct)
    return await this.productsRepo.findOneById(id)
  }

  async updateDay(id: number, dayId: number, status: string): Promise<Product> {
    if (status === 'true') {
      await this.productsRepo
        .createQueryBuilder()
        .relation(Product, 'days')
        .of(id)
        .add(dayId)
    } else {
      await this.productsRepo
        .createQueryBuilder()
        .relation(Product, 'days')
        .of(id)
        .remove(dayId)
    }
    return await this.productsRepo.findOneById(id)
  }

  async delete(id: number): Promise<void> {
    const product = await this.productsRepo.findOneById(id)
    await this.productsRepo.remove(product)
  }

  async getTodayProducts(): Promise<Product[]> {
    return await this.productsRepo
      .createQueryBuilder('product')
      .leftJoinAndSelect('product.days', 'day')
      .where('day.id=:date', { date: moment().format('E') })
      .getMany()
  }
}
