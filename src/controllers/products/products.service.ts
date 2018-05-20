import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Connection, Repository, getRepository } from 'typeorm'
import * as moment from 'moment'
import { Product } from '../../entities/Product.entity'
import { CreateProductDto } from './dto/create-product.dto'
import { Day } from '../../entities/Day.entity'
import { Category } from './../../entities/Category.entity'

@Injectable()
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
    return await this.productsRepo.findOne(id, {
      select: [
        'id',
        'name',
        'price',
        'description',
        'image',
        'stock',
        'stockOut'
      ],
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
    const dayRepo = getRepository(Day)
    // const haveDay = await dayRepo.find( { where: { code: day.code, 'productId': id } } )
    const haveDay = await this.productsRepo
      .createQueryBuilder('product')
      .leftJoinAndSelect('product.days', 'days')
      .where('product.id = :id', { id })
      .andWhere('days.code = :code', { code: day.code })
      .getOne()

    console.log('HAVE DAY', haveDay)

    if (haveDay) {
      // update
      const theDay = await dayRepo.findOne(haveDay.days[0].id)
      theDay.stock = day.stock
      theDay.stockOut = day.stockOut
      await dayRepo.save(theDay)
      return await this.productsRepo.findOne(id, { relations: ['days'] })
    } else {
      // create
      const aDay = Object.assign(new Day(), day)
      aDay.product = await this.productsRepo.findOne(id)
      const saveDay = await dayRepo.save(aDay)
      await this.productsRepo
        .createQueryBuilder()
        .relation(Product, 'days')
        .of(id)
        .add(saveDay)
      return await this.productsRepo.findOne(id, { relations: ['days'] })
    }
  }

  async addCategories(id: number, category: any): Promise<Product> {
    const product = await this.productsRepo.findOne(id, {
      relations: ['categories']
    })
    const aCategory = Object.assign(new Category(), category)
    product.categories.push(aCategory)
    await this.productsRepo.save(product)
    return await this.productsRepo.findOne(id, {
      relations: ['categories']
    })
  }

  async update(id: number, product?: Product): Promise<Product> {
    const aProduct = Object.assign(new Product(), product)
    await this.productsRepo.update(id, aProduct)
    return await this.productsRepo.findOne(id)
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
    return await this.productsRepo.findOne(id)
  }

  async delete(id: number): Promise<void> {
    const product = await this.productsRepo.findOne(id)
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
