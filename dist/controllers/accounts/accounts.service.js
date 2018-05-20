"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const jwt = require("jsonwebtoken");
const _ = require("lodash");
const User_entity_1 = require("../../entities/User.entity");
const token_secret = process.env.TOKEN_SECRET || 'sfoodt';
let AccountsService = class AccountsService {
    constructor(accountsRepo) {
        this.accountsRepo = accountsRepo;
    }
    login(account) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.accountsRepo
                .createQueryBuilder()
                .select(['User.id', 'User.email', 'User.first_name', 'User.last_name'])
                .where('username=:username', { username: account.username })
                .andWhere('password=:password', { password: account.password })
                .leftJoinAndSelect('User.roles', 'roles')
                .getOne();
            if (_.isEmpty(user)) {
                return new common_1.NotFoundException();
            }
            else {
                return this.createToken(user);
            }
        });
    }
    findUserName(username) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.accountsRepo.find({ where: { username } });
        });
    }
    create(user) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.accountsRepo.save(user);
        });
    }
    createToken(user) {
        const expiresIn = 60 * 60 * 10;
        const secretOrKey = token_secret;
        const token = jwt.sign(Object.assign({}, user), secretOrKey, { expiresIn });
        return {
            expires_in: expiresIn,
            access_token: token
        };
    }
    validateUser(signedUser) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.accountsRepo
                .createQueryBuilder()
                .select(['User.id'])
                .where('id=:id', { id: signedUser.id })
                .getOne();
            if (_.isEmpty(user)) {
                return false;
            }
            else {
                return true;
            }
        });
    }
    findOne(user) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.accountsRepo
                .createQueryBuilder()
                .select(['User.id', 'User.email', 'User.first_name', 'User.last_name'])
                .where('username=:username', { username: user.username })
                .leftJoinAndSelect('User.roles', 'roles')
                .getOne();
        });
    }
};
AccountsService = __decorate([
    common_1.Component(),
    __param(0, typeorm_1.InjectRepository(User_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], AccountsService);
exports.AccountsService = AccountsService;
//# sourceMappingURL=accounts.service.js.map