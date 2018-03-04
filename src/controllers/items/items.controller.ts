import { Controller, Get, Post, Patch, Delete, Req, Param, Body, Query } from '@nestjs/common'
import { BadRequestException } from '@nestjs/common'
import { UsePipes } from '@nestjs/common'
import { ValidationPipe } from '../../common/pipes/validation.pipe'
import { ParseIntPipe } from '../../common/pipes/parse-int.pipe'

import { ItemsService } from './items.service'
import { Item } from '../../entities/Item.entity'
import { CreateItemDto } from './dto/create-item.dto'
import { UpdateItemDto } from './dto/update-item.dto'

@Controller('items')
export class ItemsController {

  constructor(
    private readonly itemsService: ItemsService,
  ) {}

  @Get()
  async findAll(): Promise<Item[]> {
    return await this.itemsService.findAll()
  }

  @Get(':id')
  async find( @Param('id', new ParseIntPipe()) id ): Promise<Item> {
    return await this.itemsService.find( id )
  }

  @Post()
  @UsePipes(new ValidationPipe())
  async create( @Body() item: CreateItemDto ): Promise<Item> {
    try {
      return await this.itemsService.create( item )
    }
    catch(error) {
      throw new BadRequestException(error)
    }
  }

  @Patch(':id')
  @UsePipes(new ValidationPipe())
  async update( @Param('id', new ParseIntPipe()) id, @Body() item: UpdateItemDto ): Promise<Item> {
    try {
      return await this.itemsService.update( id, item )
    }
    catch( error ) {
      throw new BadRequestException(error)
    }
  }

  @Delete(':id')
  async delete( @Param('id', new ParseIntPipe()) id ) {
    await this.itemsService.delete( id )
  }


}
