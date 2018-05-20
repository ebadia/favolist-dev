"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const typeorm_1 = require("typeorm");
const chai_1 = require("chai");
const users_controller_1 = require("../users.controller");
const users_service_1 = require("../users.service");
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
];
describe('UsersController Tests', () => {
    let usersController;
    let usersService;
    beforeEach(() => __awaiter(this, void 0, void 0, function* () {
        const module = yield testing_1.Test.createTestingModule({
            providers: [users_service_1.UsersService, {
                    provide: 'UserRepository',
                    useClass: typeorm_1.Repository
                }],
            controllers: [users_controller_1.UsersController],
        }).compile();
        usersService = module.get(users_service_1.UsersService);
        usersController = module.get(users_controller_1.UsersController);
    }));
    it('should exist controller', () => {
        chai_1.expect(usersController).to.exist;
    });
    it('should exist service', () => {
        chai_1.expect(usersService).to.exist;
    });
    describe('/users', () => {
        it('should return an array of users', () => __awaiter(this, void 0, void 0, function* () {
        }));
    });
});
//# sourceMappingURL=users.controller.speckk.js.map