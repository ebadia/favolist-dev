import { Component, Inject } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

// import { Cat } from './interfaces/cat.interface';
import { Available } from '../../entities/Available.entity'
import { User } from '../../entities/User.entity'
import { Product } from '../../entities/Product.entity'


@Component()
export class MailsService {
  constructor(
    // @InjectRepository(Available)
    @Inject('MailerProvider') private readonly mailerProvider
  ) {}

  welcome( payload?: any ): Promise<any> {
    // set options
    return this.mailerProvider.sendMail({
      to: 'enric@ideatius.com',
      subject: 'Bienvenido a Favolist',
      template: 'welcome',
      context: payload
    })
  }

}
