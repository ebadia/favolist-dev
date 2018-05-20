import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import * as jwt from 'jsonwebtoken'
import * as _ from 'lodash'

import { AccountsController } from './accounts.controller'
import { User } from '../../entities/User.entity'
import { LoginUserDto } from './dto/login-user.dto'
import { CreateUserDto } from '../users/dto/create-user.dto'

const token_secret = process.env.TOKEN_SECRET || 'sfoodt'

@Injectable()
export class AccountsService {
  constructor(
    @InjectRepository(User) private readonly accountsRepo: Repository<User>
  ) {}

  async login(account: LoginUserDto): Promise<any> {
    const user = await this.accountsRepo
      .createQueryBuilder()
      .select(['User.id', 'User.email', 'User.first_name', 'User.last_name'])
      .where('username=:username', { username: account.username })
      .andWhere('password=:password', { password: account.password })
      .leftJoinAndSelect('User.roles', 'roles')
      .getOne()

    // console.log(JSON.stringify(user))

    if (_.isEmpty(user)) {
      return new NotFoundException()
    } else {
      // const expiresIn = 60 * 60
      // const secretOrKey = token_secret
      //
      // var token = jwt.sign( {user}, secretOrKey, { expiresIn })
      // return {
      //   expires_in: expiresIn,
      //   access_token: token,
      // }

      return this.createToken(user)
    }
  }

  async findUserName(username: string): Promise<User[]> {
    return await this.accountsRepo.find({ where: { username } })
  }

  async create(user: CreateUserDto): Promise<CreateUserDto> {
    return await this.accountsRepo.save(user)
  }

  private createToken(
    user: User
  ): { expires_in: number; access_token: string } {
    const expiresIn = 60 * 60 * 10
    const secretOrKey = token_secret

    const token = jwt.sign(Object.assign({}, user), secretOrKey, { expiresIn })
    // console.log(token)

    return {
      expires_in: expiresIn,
      access_token: token
    }
  }

  async validateUser(signedUser): Promise<boolean> {
    // console.log('SIGNED USER ::: ', signedUser)
    // put some validation logic here
    // for example query user by id / email / username

    const user = await this.accountsRepo
      .createQueryBuilder()
      .select(['User.id'])
      .where('id=:id', { id: signedUser.id })
      .getOne()

    if (_.isEmpty(user)) {
      return false
    } else {
      return true
    }
  }

  async findOne(user: LoginUserDto): Promise<User> {
    return await this.accountsRepo
      .createQueryBuilder()
      .select(['User.id', 'User.email', 'User.first_name', 'User.last_name'])
      .where('username=:username', { username: user.username })
      .leftJoinAndSelect('User.roles', 'roles')
      .getOne()
  }
}
