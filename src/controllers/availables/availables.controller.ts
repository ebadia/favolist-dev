import { Controller, Get, Post, Req, Param, Body, Query } from '@nestjs/common'
import { ForbiddenException, BadRequestException, ConflictException, Patch, Delete } from '@nestjs/common'
import { UsePipes } from '@nestjs/common'
import { ValidationPipe } from '../../common/pipes/validation.pipe'
import { ParseIntPipe } from '../../common/pipes/parse-int.pipe'

import { AvailablesService } from './availables.service'
import { Available } from '../../entities/Available.entity'
import { CreateAvailableDto } from './dto/create-available.dto'
import { UpdateAvailableDto } from './dto/update-available.dto'

@Controller('availables')
export class AvailablesController {

  constructor(
    private readonly availablesService: AvailablesService
  ) {}

  @Get()
  async findAll(): Promise<Available[]> {
    return await this.availablesService.findAll()
  }

  @Get('/shops/:id')
  async findFromShop( @Param('id', new ParseIntPipe()) id, @Query('date') date ): Promise<Available> {
    return await this.availablesService.findFromShop( id, date )
  }

  @Get('/today/shops/:id')
  async findTodayFromShop( @Param('id', new ParseIntPipe()) id ): Promise<Available> {
    const date = new Date(Date.now()).toISOString().split('T')[0]
    return await this.availablesService.findFromShop( id, date )
  }

  @Get(':id')
  async findOne( @Param('id', new ParseIntPipe()) id ): Promise<Available> {
    return await this.availablesService.findOne( id )
  }

  @Post()
  @UsePipes(new ValidationPipe())
  async create( @Body() available: CreateAvailableDto ): Promise<Available> {
    const isCreated = await this.availablesService.create( available )
    if ( isCreated ) {
      return await this.availablesService.create( available )
    } else {
      throw new ConflictException()
    }
  }

  @Patch(':id')
  async update( @Param('id', new ParseIntPipe()) id, @Body() available: UpdateAvailableDto ) {
    try {
      return await this.availablesService.update( id, available )
    }
    catch( error ) {
      throw new BadRequestException(error)
    }
  }

  @Delete(':id')
  async delete( @Param('id', new ParseIntPipe()) id) {
    await this.availablesService.delete(id)
  }



}
