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
  MaxLength
} from 'class-validator'

import { Shop } from './Shop.entity'
import { User } from './User.entity'
import { Item } from './Item.entity'
import { Available } from './Available.entity'
import { Category } from './Category.entity'
import { Day } from './Day.entity'

@Entity()
export class Product {
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

  @Column('real') price: string

  @Column('text', {
    nullable: true
  })
  description: string

  @Column('character varying', {
    nullable: true,
    unique: false,
    length: 255
  })
  @IsUrl()
  image: string

  // Relations

  @ManyToOne(type => Shop, shop => shop.products, {
    cascadeInsert: true,
    cascadeUpdate: true,
    cascadeRemove: true
  })
  shop: Shop

  @ManyToMany(type => User, user => user.products)
  users: User[]

  @ManyToMany(type => Category, category => category.products)
  @JoinTable()
  categories: Category[]

  @ManyToMany(type => Day, day => day.products)
  @JoinTable()
  days: Day[]

  @OneToMany(type => Item, items => items.product)
  items: Item[]

  @OneToMany(type => Available, avaliables => avaliables.product)
  avaliables: Available[]
}
