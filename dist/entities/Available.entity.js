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
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const typeorm_2 = require("typeorm");
const Product_entity_1 = require("./Product.entity");
let Available = class Available extends typeorm_1.BaseEntity {
    static getAvailablesByShop(shopId, date) {
        return this.query(`
      SELECT available.id,
        available.day,
        available.stock,
        available.stockOut,
        available.'productId',
        product.name AS product,
        shop.name AS shop,
        shop.id AS shopid
       FROM available
         LEFT JOIN product ON available.'productId' = product.id
         LEFT JOIN shop ON product.'shopId' = ${shopId}
      `);
    }
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Available.prototype, "id", void 0);
__decorate([
    typeorm_2.CreateDateColumn({
        select: false
    }),
    __metadata("design:type", Date)
], Available.prototype, "createdAt", void 0);
__decorate([
    typeorm_2.UpdateDateColumn({
        select: false
    }),
    __metadata("design:type", Date)
], Available.prototype, "updatedAt", void 0);
__decorate([
    typeorm_1.Column('date', {
        nullable: false
    }),
    __metadata("design:type", String)
], Available.prototype, "day", void 0);
__decorate([
    typeorm_1.Column('smallint', {
        nullable: false
    }),
    __metadata("design:type", String)
], Available.prototype, "stock", void 0);
__decorate([
    typeorm_1.Column('real', {
        nullable: true
    }),
    __metadata("design:type", String)
], Available.prototype, "price", void 0);
__decorate([
    typeorm_1.Column('smallint', {
        nullable: true
    }),
    __metadata("design:type", String)
], Available.prototype, "stockOut", void 0);
__decorate([
    typeorm_2.ManyToOne(type => Product_entity_1.Product, product => product.avaliables),
    __metadata("design:type", Product_entity_1.Product)
], Available.prototype, "product", void 0);
Available = __decorate([
    typeorm_1.Entity()
], Available);
exports.Available = Available;
//# sourceMappingURL=Available.entity.js.map