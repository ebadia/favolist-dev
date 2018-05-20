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
const moment = require("moment");
const Product_entity_1 = require("../../entities/Product.entity");
const Day_entity_1 = require("../../entities/Day.entity");
const Category_entity_1 = require("./../../entities/Category.entity");
let ProductsService = class ProductsService {
    constructor(productsRepo, _connection) {
        this.productsRepo = productsRepo;
        this._connection = _connection;
    }
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.productsRepo.find({
                select: ['id', 'name', 'price', 'description', 'image']
            });
        });
    }
    findOne(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.productsRepo.findOneById(id, {
                select: ['id', 'name', 'price', 'description', 'image', 'stock', 'stockOut'],
                relations: ['days']
            });
        });
    }
    findAllDays() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.productsRepo.find({
                select: ['id', 'name', 'price', 'description', 'image'],
                relations: ['days']
            });
        });
    }
    getAllDays() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this._connection
                .getRepository(Day_entity_1.Day)
                .createQueryBuilder('days')
                .getMany();
        });
    }
    findAllShops() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.productsRepo.find({
                select: ['id', 'name', 'price', 'description', 'image'],
                relations: ['shop']
            });
        });
    }
    create(product) {
        return __awaiter(this, void 0, void 0, function* () {
            const aProduct = Object.assign(new Product_entity_1.Product(), product);
            return yield this.productsRepo.save(aProduct);
        });
    }
    addDays(id, day) {
        return __awaiter(this, void 0, void 0, function* () {
            const dayRepo = typeorm_2.getRepository(Day_entity_1.Day);
            const haveDay = yield this.productsRepo
                .createQueryBuilder("product")
                .leftJoinAndSelect("product.days", "days")
                .where("product.id = :id", { id })
                .andWhere("days.code = :code", { code: day.code })
                .getOne();
            console.log('HAVE DAY', haveDay);
            if (haveDay) {
                const theDay = yield dayRepo.findOneById(haveDay.days[0].id);
                theDay.stock = day.stock;
                theDay.stockOut = day.stockOut;
                yield dayRepo.save(theDay);
                return yield this.productsRepo.findOneById(id, { relations: ['days'] });
            }
            else {
                const aDay = Object.assign(new Day_entity_1.Day(), day);
                aDay.product = yield this.productsRepo.findOneById(id);
                const saveDay = yield dayRepo.save(aDay);
                yield this.productsRepo
                    .createQueryBuilder()
                    .relation(Product_entity_1.Product, 'days')
                    .of(id)
                    .add(saveDay);
                return yield this.productsRepo.findOneById(id, { relations: ['days'] });
            }
        });
    }
    addCategories(id, category) {
        return __awaiter(this, void 0, void 0, function* () {
            const product = yield this.productsRepo.findOneById(id, {
                relations: ['categories']
            });
            const aCategory = Object.assign(new Category_entity_1.Category(), category);
            product.categories.push(aCategory);
            yield this.productsRepo.save(product);
            return yield this.productsRepo.findOneById(id, {
                relations: ['categories']
            });
        });
    }
    update(id, product) {
        return __awaiter(this, void 0, void 0, function* () {
            const aProduct = Object.assign(new Product_entity_1.Product(), product);
            yield this.productsRepo.updateById(id, aProduct);
            return yield this.productsRepo.findOneById(id);
        });
    }
    updateDay(id, dayId, status) {
        return __awaiter(this, void 0, void 0, function* () {
            if (status === 'true') {
                yield this.productsRepo
                    .createQueryBuilder()
                    .relation(Product_entity_1.Product, 'days')
                    .of(id)
                    .add(dayId);
            }
            else {
                yield this.productsRepo
                    .createQueryBuilder()
                    .relation(Product_entity_1.Product, 'days')
                    .of(id)
                    .remove(dayId);
            }
            return yield this.productsRepo.findOneById(id);
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const product = yield this.productsRepo.findOneById(id);
            yield this.productsRepo.remove(product);
        });
    }
    getTodayProducts() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.productsRepo
                .createQueryBuilder('product')
                .leftJoinAndSelect('product.days', 'day')
                .where('day.id=:date', { date: moment().format('E') })
                .getMany();
        });
    }
};
ProductsService = __decorate([
    common_1.Component(),
    __param(0, typeorm_1.InjectRepository(Product_entity_1.Product)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Connection])
], ProductsService);
exports.ProductsService = ProductsService;
//# sourceMappingURL=products.service.js.map