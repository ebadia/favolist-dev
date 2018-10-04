import * as dotenv from 'dotenv'
dotenv.config()
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
  Delete,
  UseInterceptors,
  FileInterceptor,
  UploadedFile
} from '@nestjs/common'
import { UsePipes } from '@nestjs/common'
import { ValidationPipe } from '../../common/pipes/validation.pipe'
import { ParseIntPipe } from '../../common/pipes/parse-int.pipe'

import { ProductsService } from './products.service'
import { Product } from '../../entities/Product.entity'
import { CreateProductDto } from './dto/create-product.dto'
import { CreateProductOrderDto } from './dto/create-product-order.dto'

import * as cloudinary from 'cloudinary'
import * as cloudinaryStorage from 'multer-storage-cloudinary'

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUDNAME,
  api_key: process.env.CLOUDINARY_APIKEY,
  api_secret: process.env.CLOUDINARY_APISECRET
})

const storage = cloudinaryStorage({
  cloudinary,
  folder: 'favolist',
  allowedFormats: ['jpg', 'png'],
  filename: (req, file, cb) => {
    cb(undefined, file.originalname)
  }
})

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  async findAll(): Promise<Product[]> {
    return await this.productsService.findAll()
  }

  @Get('edit/:id')
  async findOne(@Param('id') id: number): Promise<Product> {
    return await this.productsService.findOne(id)
  }

  @Get('shops')
  async findAllShops(): Promise<Product[]> {
    return await this.productsService.findAllShops()
  }

  @Get('days')
  async findAllDays(): Promise<Product[]> {
    return await this.productsService.findAllDays()
  }

  @Get('all/days')
  async getAllDays(): Promise<Product[]> {
    return await this.productsService.getAllDays()
  }

  @Post()
  @UsePipes(new ValidationPipe())
  async create(@Body() product: CreateProductDto): Promise<Product> {
    return await this.productsService.create(product)
  }

  @Post('upload/:producto')
  @UseInterceptors(FileInterceptor('file', { storage }))
  async upload(
    @UploadedFile() file,
    @Param('producto') producto,
    @Req() req
  ): Promise<Product> {
    return this.productsService.upload(file, producto, req)
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

  @Get(':id/days/:dayId/status/:status')
  async updateDay(
    @Param('id', new ParseIntPipe())
    id,
    @Param('dayId') dayId: number,
    @Param('status') status: string
  ) {
    try {
      return await this.productsService.updateDay(id, dayId, status)
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
