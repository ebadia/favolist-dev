import * as express from 'express';
import * as request from 'supertest';
import { Test } from '@nestjs/testing'
import { TypeOrmModule } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { expect } from 'chai'

import { UsersModule } from '../users.module'
import { UsersController } from '../users.controller'
import { UsersService } from '../users.service'
import { User } from '../../../entities/User.entity'

const users = [
    {
        "id": 1,
        "createdAt": "2018-01-22T21:59:17.732Z",
        "updatedAt": "2018-01-22T21:59:17.732Z",
        "first_name": "John",
        "last_name": "Doe",
        "email": "jdoe@mail.com",
        "mobile": "+34666555444",
        "phone": null,
        "username": "john"
    }
]

describe( 'UsersController Tests', () => {

  const server = express()
  const usersService = { findAll: () => users }

  beforeEach( async () => {
    const module = await Test.createTestingModule({
      components: [ UsersService, {
        provide: 'UserRepository',
        useClass: Repository
      } ],
      controllers: [ UsersController ],
    })
    .overrideComponent(UsersService).useValue(usersService)
    .compile()

    const app = module.createNestApplication(server)
    await app.init()

  })

  // it( 'should exist controller', () => {
  //   // expect( usersController ).toBeTruthy()
  //   expect( usersController ).to.exist
  // })

  it( 'should exist service', () => {
    // expect( usersService ).toBeTruthy()
    expect( usersService ).to.exist
  })

  describe('/users', () => {
    it('should return an array of users', () => {
      return request(server)
        .get('/users')
        .expect(200)
        .expect( users )
    })
  })

})
