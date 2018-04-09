import {
  BaseEntity,
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
  MaxLength
} from 'class-validator'

import { Product } from './Product.entity'
import { Item } from './Item.entity'
import { Shop } from './Shop.entity'
import { User } from './User.entity'

import { status } from '../common/interfaces/enums'

@Entity()
export class Order extends BaseEntity {
  @PrimaryGeneratedColumn() id: number
  @CreateDateColumn({
    select: false
  })
  createdAt: Date
  @UpdateDateColumn({
    select: false
  })
  updatedAt: Date

  @Column('date', {
    nullable: true
  })
  day: string

  @Column('time', {
    nullable: true
  })
  hour: string

  @Column('character varying', {
    nullable: true,
    default: String(status.ORDERING),
    length: 100
  })
  status: string

  // Relations

  @OneToMany(type => Item, items => items.order)
  items: Item[]

  @ManyToOne(type => Shop, shop => shop.orders)
  shop: Shop

  @ManyToOne(type => User, user => user.orders)
  user: User

  // calculations

  static getOrderTotal(id: number) {
    return this.query(`
        SELECT
        SUM("item"."quantity" * "product"."price")
        FROM
        "order"
        JOIN "item"
        ON "order"."id" = "item"."orderId"
        JOIN "product"
        ON "item"."productId" = "product"."id"
        WHERE
        "order"."id" = ${id}
      `)
  }
}
