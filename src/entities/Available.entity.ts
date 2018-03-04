import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinTable
} from 'typeorm'
import {
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

@Entity()
export class Available extends BaseEntity {
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
    nullable: false
  })
  day: string

  @Column('smallint', {
    nullable: false
  })
  stock: string

  // Relations

  @ManyToOne(type => Product, product => product.avaliables)
  product: Product

  /*
  SELECT available.id,
    available.day,
    available.stock,
    available.'productId',
    product.name AS product,
    shop.name AS shop,
    shop.id AS shopid
   FROM available
     LEFT JOIN product ON available.'productId' = product.id
     LEFT JOIN shop ON product.'shopId' = shop.id
  */

  static getAvailablesByShop(shopId: number, date: string) {
    return this.query(`
      SELECT available.id,
        available.day,
        available.stock,
        available.'productId',
        product.name AS product,
        shop.name AS shop,
        shop.id AS shopid
       FROM available
         LEFT JOIN product ON available.'productId' = product.id
         LEFT JOIN shop ON product.'shopId' = ${shopId}
      `)
  }
}
