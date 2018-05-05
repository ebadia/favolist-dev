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

import { DayOfWeek } from '../common/interfaces/enums'
import { Product } from './Product.entity'

@Entity()
export class Day {
  @PrimaryGeneratedColumn() id: number
  @CreateDateColumn() createdAt: Date
  @UpdateDateColumn() updatedAt: Date

  @Column('integer', {
    nullable: false
  })
  code: DayOfWeek

  @Column('integer', {
    nullable: false,
    default: 0
  })
  stock: number

  @Column('integer', {
    nullable: false,
    default: 0
  })
  stockOut: number

  @Column('character varying', {
    nullable: false,
    length: 255
  })
  name: string

  // Relations

  @ManyToMany(type => Product, product => product.days)
  products: Product[]
}
