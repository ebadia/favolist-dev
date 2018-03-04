import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinTable,
  ManyToOne,
  ManyToMany,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
  VersionColumn
} from 'typeorm'
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
  MaxLength,
  IsOptional
} from 'class-validator'

import { User } from './User.entity'
import { Order } from './Order.entity'
import { Product } from './Product.entity'

@Entity()
export class Shop {
  @PrimaryGeneratedColumn() id: number
  @CreateDateColumn({
    select: false
  })
  createdAt: Date
  @UpdateDateColumn({
    select: false
  })
  updatedAt: Date

  @Column('character varying', {
    nullable: false,
    unique: true,
    length: 255
  })
  name: string

  @Column('character varying', {
    nullable: true,
    length: 10
  })
  nif: string

  @Column('character varying', {
    nullable: true,
    length: 255
  })
  address: string

  @Column('character varying', {
    nullable: true,
    length: 5
  })
  cp: string

  @Column('character varying', {
    nullable: true,
    length: 255
  })
  city: string

  @Column('character varying', {
    nullable: true,
    length: 255
  })
  state: string

  @Column('character varying', {
    nullable: true,
    length: 12
  })
  phone: string

  @Column('character varying', {
    nullable: true,
    length: 255
  })
  @IsEmail()
  email: string

  @Column('character varying', {
    nullable: true,
    length: 255
  })
  web: string

  @Column('character varying', {
    nullable: true,
    length: 255
  })
  fb: string

  // Relations

  @OneToMany(type => Order, orders => orders.shop)
  orders: Order[]

  @OneToMany(type => User, user => user.shop, {
    cascadeInsert: true,
    cascadeUpdate: true
  })
  admins: User[]

  @OneToMany(type => Product, products => products.shop)
  products: Product[]

  @ManyToMany(type => User, users => users.shops, {
    cascadeInsert: true,
    cascadeUpdate: true
  })
  @JoinTable()
  users: User[]
}
