import {
  Controller,
  Get,
  Post,
  Req,
  Param,
  Body,
  ForbiddenException,
  BadRequestException,
  Patch,
  Delete
} from '@nestjs/common'
import { UsePipes } from '@nestjs/common'
import { ValidationPipe } from '../../common/pipes/validation.pipe'
import { ParseIntPipe } from '../../common/pipes/parse-int.pipe'

import { ProductsService } from './products.service'
import { Product } from '../../entities/Product.entity'
import { CreateProductDto } from './dto/create-product.dto'
import { CreateProductOrderDto } from './dto/create-product-order.dto'

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  async findAll(): Promise<Product[]> {
    return await this.productsService.findAll()
  }

  @Get('shops')
  async findAllShops(): Promise<Product[]> {
    return await this.productsService.findAllShops()
  }

  @Get('days')
  async findAllDays(): Promise<Product[]> {
    return await this.productsService.findAllDays()
  }

  @Post()
  @UsePipes(new ValidationPipe())
  async create(@Body() product: CreateProductDto): Promise<Product> {
    return await this.productsService.create(product)
  }

  @Post(':id/days')
  async addDays(
    @Param('id', new ParseIntPipe())
    id,
    @Body() day: any
  ): Promise<Product> {
    return await this.productsService.addDays(id, day)
  }

  @Post(':id/categories')
  async addCategories(
    @Param('id', new ParseIntPipe())
    id,
    @Body() day: any
  ): Promise<Product> {
    return await this.productsService.addCategories(id, day)
  }

  @Patch(':id')
  async update(
    @Param('id', new ParseIntPipe())
    id,
    @Body() product: Product
  ) {
    try {
      return await this.productsService.update(id, product)
    } catch (error) {
      throw new BadRequestException(error)
    }
  }

  @Delete(':id')
  async delete(
    @Param('id', new ParseIntPipe())
    id
  ) {
    await this.productsService.delete(id)
  }

  @Get('today')
  async todayProducts(): Promise<Product[]> {
    return await this.productsService.getTodayProducts()
  }
}
