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

import { Product } from './Product.entity'

@Entity()
export class Category {
  @PrimaryGeneratedColumn() id: number
  @CreateDateColumn() createdAt: Date
  @UpdateDateColumn() updatedAt: Date

  @Column('character varying', {
    nullable: false,
    length: 255
  })
  name: string

  // Relations

  @ManyToMany(type => Product, product => product.categories)
  products: Product[]
}
