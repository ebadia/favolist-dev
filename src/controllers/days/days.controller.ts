import { Controller, Get, Post, Patch, Delete, Req, Param, Body, Query } from '@nestjs/common'
import { BadRequestException } from '@nestjs/common'
import { UsePipes } from '@nestjs/common'
import { ValidationPipe } from '../../common/pipes/validation.pipe'
import { ParseIntPipe } from '../../common/pipes/parse-int.pipe'

import { DaysService } from './days.service'
import { Day } from '../../entities/Day.entity'
import { CreateDayDto } from './dto/create-day.dto'
import { UpdateDayDto } from './dto/update-day.dto'

@Controller('days')
export class DaysController {

  constructor(
    private readonly service: DaysService,
  ) {}

  @Get()
  async findAll(): Promise<Day[]> {
    return await this.service.findAll()
  }

  @Get(':id')
  async find( @Param('id', new ParseIntPipe()) id ): Promise<Day> {
    return await this.service.find( id )
  }

  @Post()
  @UsePipes(new ValidationPipe())
  async create( @Body() item: CreateDayDto ): Promise<Day> {
    try {
      return await this.service.create( item )
    }
    catch(error) {
      throw new BadRequestException(error)
    }
  }

  @Patch(':id')
  @UsePipes(new ValidationPipe())
  async update( @Param('id', new ParseIntPipe()) id, @Body() item: UpdateDayDto ): Promise<Day> {
    try {
      return await this.service.update( id, item )
    }
    catch( error ) {
      throw new BadRequestException(error)
    }
  }

  @Delete(':id')
  async delete( @Param('id', new ParseIntPipe()) id ) {
    await this.service.delete( id )
  }


}
