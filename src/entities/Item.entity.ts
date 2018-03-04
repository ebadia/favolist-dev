import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinTable,
  JoinColumn,
  ManyToOne,
  ManyToMany,
  OneToMany,
  OneToOne
} from 'typeorm'
import { CreateDateColumn, UpdateDateColumn, VersionColumn } from 'typeorm'
import {
  Contains,
  IsInt,
  Length,
  IsEmail,
  IsUrl,
  IsFQDN,
  IsDate,
  Min,
  Max,
  MinLength,
  MaxLength
} from 'class-validator'

import { Product } from './Product.entity'
import { Order } from './Order.entity'
import { status } from '../common/interfaces/enums'

@Entity()
export class Item {
  @PrimaryGeneratedColumn() id: number
  @CreateDateColumn({
    select: false
  })
  createdAt: Date
  @UpdateDateColumn({
    select: false
  })
  updatedAt: Date

  @Column('smallint') quantity: string

  @Column('character varying', {
    nullable: true,
    default: String(status.PENDING),
    length: 100
  })
  status: string

  // Relations

  @ManyToOne(type => Product, product => product.items, { eager: true })
  @JoinColumn()
  product: Product

  @ManyToOne(type => Order, order => order.items)
  order: Order
}
