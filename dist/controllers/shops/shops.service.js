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
const Shop_entity_1 = require("../../entities/Shop.entity");
const User_entity_1 = require("../../entities/User.entity");
let ShopsService = class ShopsService {
    constructor(shopsRepo) {
        this.shopsRepo = shopsRepo;
    }
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.shopsRepo.find();
        });
    }
    findAllWithUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.shopsRepo.find({ relations: ['users'] });
        });
    }
    findAllWithProducts() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.shopsRepo.find({ relations: ['products'] });
        });
    }
    findOne(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.shopsRepo.findOneById(id, { relations: ['orders'] });
        });
    }
    findOneWithUsers(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.shopsRepo.findOneById(id, { relations: ['users'] });
        });
    }
    findOneWithProducts(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.shopsRepo.findOneById(id, {
                relations: ['products', 'products.days']
            });
        });
    }
    create(shop) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.shopsRepo.save(shop);
        });
    }
    update(id, shop) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.shopsRepo.updateById(id, shop);
            return yield this.shopsRepo.findOneById(id);
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.shopsRepo
                .createQueryBuilder()
                .delete()
                .where('id=:id', { id })
                .execute();
        });
    }
    findOneWithAdmins(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.shopsRepo.findOneById(id, { relations: ['admins'] });
        });
    }
    findOneWithOrders(id, day) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.shopsRepo.findOneById(id, {
                where: { Orders_day: day },
                relations: ['orders', 'orders.items', 'items.product']
            });
        });
    }
    addProductToShop(id, product) {
        return __awaiter(this, void 0, void 0, function* () {
            const shop = yield this.shopsRepo.findOneById(id, {
                relations: ['products']
            });
            shop.products.push(product);
            yield this.shopsRepo.save(shop);
            return yield this.shopsRepo.findOneById(id, { relations: ['products'] });
        });
    }
    addAdminToShop(id, admin) {
        return __awaiter(this, void 0, void 0, function* () {
            const shop = yield this.shopsRepo.findOneById(id, { relations: ['admins'] });
            const obj = Object.assign(new User_entity_1.User(), admin);
            shop.admins.push(admin);
            yield this.shopsRepo.save(shop);
            return yield this.shopsRepo.findOneById(id, { relations: ['admins'] });
        });
    }
    removeAdminFromShop(shopId, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const shop = yield this.shopsRepo.findOneById(shopId, {
                relations: ['admins']
            });
            const obj = shop.admins.filter(o => {
                return !(o.id === shopId);
            });
            shop.admins = obj;
            yield this.shopsRepo.save(shop);
            return yield this.shopsRepo.findOneById(shopId, { relations: ['admins'] });
        });
    }
    saveOrder(shop) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.shopsRepo.save(shop);
        });
    }
};
ShopsService = __decorate([
    common_1.Component(),
    __param(0, typeorm_1.InjectRepository(Shop_entity_1.Shop)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], ShopsService);
exports.ShopsService = ShopsService;
//# sourceMappingURL=shops.service.js.map