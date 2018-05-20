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
const Available_entity_1 = require("../../entities/Available.entity");
let AvailablesService = class AvailablesService {
    constructor(availablesRepo) {
        this.availablesRepo = availablesRepo;
    }
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.availablesRepo.find({ relations: ['product'] });
        });
    }
    findOne(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.availablesRepo.findOneById(id, { relations: ['product'] });
        });
    }
    findOneWithProduct(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.availablesRepo.findOneById(id, { relations: ['product'] });
        });
    }
    create(product) {
        return __awaiter(this, void 0, void 0, function* () {
            const exists = yield this.availablesRepo.query(`
        SELECT * FROM available
         WHERE "available"."productId" = ${product.product.id}
         AND available.day = '${product.day}'
        ;
    `);
            if (exists.length === 0) {
                const aProduct = Object.assign(new Available_entity_1.Available(), product);
                return yield this.availablesRepo.save(aProduct);
            }
            else {
                return null;
            }
        });
    }
    update(id, product) {
        return __awaiter(this, void 0, void 0, function* () {
            const aProduct = Object.assign(new Available_entity_1.Available(), product);
            yield this.availablesRepo.updateById(id, aProduct);
            return yield this.availablesRepo.findOneById(id);
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.availablesRepo
                .createQueryBuilder()
                .delete()
                .where('id=:id', { id })
                .execute();
        });
    }
    findFromShop(id, date) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.availablesRepo.query(`
          SELECT
          "available"."id" AS "availableId",
          "available"."price" AS "availablePrice",
          "available"."day",
          "available"."stock" AS "availableStock",
          "available"."stockOut" AS "availableStockOut",
          "available"."productId",
          "product".*,
          "shop"."name" AS "shop",
          "shop"."id" AS "shopid"
          FROM
          "available"
          LEFT JOIN "product"
          ON "available"."productId" = "product"."id"
          LEFT JOIN "shop"
          ON "product"."shopId" = "shop"."id"
          WHERE
          "shop"."id" = ${id}
          AND "available"."day" = '${date}'
        ;
        `);
        });
    }
};
AvailablesService = __decorate([
    common_1.Component(),
    __param(0, typeorm_1.InjectRepository(Available_entity_1.Available)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], AvailablesService);
exports.AvailablesService = AvailablesService;
//# sourceMappingURL=availables.service.js.map