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
  IsFQDN,
  IsDate,
  Min,
  Max,
  MinLength,
  MaxLength
} from 'class-validator'

import { Shop } from './Shop.entity'
import { Product } from './Product.entity'
import { Order } from './Order.entity'
import { Role } from './Role.entity'

@Entity()
export class User {
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
    nullable: true,
    length: 255
  })
  first_name: string

  @Column('character varying', {
    nullable: true,
    length: 255
  })
  last_name: string

  @Column('character varying', {
    nullable: true,
    unique: true,
    length: 255
  })
  email: string

  @Column('character varying', {
    nullable: true,
    unique: true,
    length: 12
  })
  mobile: string

  @Column('character varying', {
    nullable: true,
    length: 12
  })
  phone: string

  @Column('character varying', {
    nullable: false,
    unique: true,
    length: 255
  })
  username: string

  @Column('character varying', {
    nullable: false,
    length: 100,
    select: false
  })
  @MinLength(5)
  @MaxLength(100)
  password: string

  // Relations

  @ManyToMany(type => Shop, shops => shops.users)
  shops: Shop[]

  @ManyToMany(type => Role, roles => roles.users)
  roles: Role[]

  @ManyToMany(type => Product, products => products.users)
  @JoinTable()
  products: Product[]

  @OneToMany(type => Order, orders => orders.user)
  orders: Order[]

  @ManyToOne(type => Shop, shop => shop.admins)
  shop: Shop
}
