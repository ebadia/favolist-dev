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
const User_entity_1 = require("../../entities/User.entity");
const Shop_entity_1 = require("../../entities/Shop.entity");
let UsersService = class UsersService {
    constructor(usersRepo) {
        this.usersRepo = usersRepo;
    }
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.usersRepo.find();
        });
    }
    findOne(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.usersRepo.findOneById(id, { relations: ['orders'] });
        });
    }
    create(user) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.usersRepo.save(user);
        });
    }
    update(id, user) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.usersRepo
                .createQueryBuilder()
                .update(User_entity_1.User)
                .set(user)
                .where('id=:id', { id })
                .execute();
            return yield this.usersRepo.findOneById(id);
        });
    }
    addRole(id, role) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.usersRepo
                .createQueryBuilder()
                .relation(User_entity_1.User, 'roles')
                .of(id)
                .add(role.id);
            return yield this.usersRepo.findOneById(id);
        });
    }
    addShopToUser(id, shop) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.usersRepo.findOneById(id, { relations: ['shops'] });
            const aShop = Object.assign(new Shop_entity_1.Shop(), shop);
            user.shops.push(aShop);
            yield this.usersRepo.save(user);
            return yield this.usersRepo.findOneById(id, { relations: ['shops'] });
        });
    }
    removeShopFromUser(userId, shopId) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.usersRepo.findOneById(userId, {
                relations: ['shops']
            });
            const aShop = user.shops.filter(obj => {
                return !(obj.id === shopId);
            });
            user.shops = aShop;
            yield this.usersRepo.save(user);
            return yield this.usersRepo.findOneById(userId, { relations: ['shops'] });
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.usersRepo.findOneById(id);
            yield this.usersRepo.remove(user);
        });
    }
    findWithShops() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.usersRepo.find({ relations: ['shops'] });
        });
    }
    findOneWithShops(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.usersRepo.findOneById(id, { relations: ['shops'] });
        });
    }
    findOneAdminShop(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.usersRepo.findOneById(id, { relations: ['shop'] });
        });
    }
    saveOrder(user) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.usersRepo.save(user);
        });
    }
};
UsersService = __decorate([
    common_1.Component(),
    __param(0, typeorm_1.InjectRepository(User_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], UsersService);
exports.UsersService = UsersService;
//# sourceMappingURL=users.service.js.map