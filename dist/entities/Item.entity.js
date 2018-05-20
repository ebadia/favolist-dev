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
const Order_entity_1 = require("./Order.entity");
const enums_1 = require("../common/interfaces/enums");
let Item = class Item {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Item.prototype, "id", void 0);
__decorate([
    typeorm_2.CreateDateColumn({
        select: false
    }),
    __metadata("design:type", Date)
], Item.prototype, "createdAt", void 0);
__decorate([
    typeorm_2.UpdateDateColumn({
        select: false
    }),
    __metadata("design:type", Date)
], Item.prototype, "updatedAt", void 0);
__decorate([
    typeorm_1.Column('smallint'),
    __metadata("design:type", String)
], Item.prototype, "quantity", void 0);
__decorate([
    typeorm_1.Column('character varying', {
        nullable: true,
        default: String(enums_1.status.PENDING),
        length: 100
    }),
    __metadata("design:type", String)
], Item.prototype, "status", void 0);
__decorate([
    typeorm_1.Column('character varying', {
        nullable: true,
        length: 100
    }),
    __metadata("design:type", String)
], Item.prototype, "place", void 0);
__decorate([
    typeorm_1.ManyToOne(type => Product_entity_1.Product, product => product.items, {
        eager: true,
        onDelete: 'CASCADE'
    }),
    typeorm_1.JoinColumn(),
    __metadata("design:type", Product_entity_1.Product)
], Item.prototype, "product", void 0);
__decorate([
    typeorm_1.ManyToOne(type => Order_entity_1.Order, order => order.items, {
        onDelete: 'CASCADE'
    }),
    __metadata("design:type", Order_entity_1.Order)
], Item.prototype, "order", void 0);
Item = __decorate([
    typeorm_1.Entity()
], Item);
exports.Item = Item;
//# sourceMappingURL=Item.entity.js.map