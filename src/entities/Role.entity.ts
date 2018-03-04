import {Entity, PrimaryGeneratedColumn, Column, JoinTable, ManyToOne, ManyToMany, OneToMany, CreateDateColumn, UpdateDateColumn, VersionColumn } from "typeorm";
import {Contains, IsInt, Length, IsEmail, IsFQDN, IsDate, Min, Max, MinLength, MaxLength} from "class-validator";

import { User } from './User.entity'

@Entity()
export class Role {

    @PrimaryGeneratedColumn()
    id:number;
    @CreateDateColumn()
    createdAt: Date
    @UpdateDateColumn()
    updatedAt: Date


  @Column("character varying",{
        nullable:false,
        unique: false,
        length:255,
        })
    name:string;

    // Relations

    @ManyToMany( type=>User, user=>user.roles, {
      cascadeInsert: true,
      cascadeUpdate: true,
    } )
    @JoinTable()
    users: User[]

}
