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
const class_validator_1 = require("class-validator");
const User_entity_1 = require("./User.entity");
const Order_entity_1 = require("./Order.entity");
const Product_entity_1 = require("./Product.entity");
let Shop = class Shop {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Shop.prototype, "id", void 0);
__decorate([
    typeorm_1.CreateDateColumn({
        select: false
    }),
    __metadata("design:type", Date)
], Shop.prototype, "createdAt", void 0);
__decorate([
    typeorm_1.UpdateDateColumn({
        select: false
    }),
    __metadata("design:type", Date)
], Shop.prototype, "updatedAt", void 0);
__decorate([
    typeorm_1.Column('character varying', {
        nullable: false,
        unique: true,
        length: 255
    }),
    __metadata("design:type", String)
], Shop.prototype, "name", void 0);
__decorate([
    typeorm_1.Column('character varying', {
        nullable: true,
        length: 10
    }),
    __metadata("design:type", String)
], Shop.prototype, "nif", void 0);
__decorate([
    typeorm_1.Column('character varying', {
        nullable: true,
        length: 255
    }),
    __metadata("design:type", String)
], Shop.prototype, "address", void 0);
__decorate([
    typeorm_1.Column('character varying', {
        nullable: true,
        length: 5
    }),
    __metadata("design:type", String)
], Shop.prototype, "cp", void 0);
__decorate([
    typeorm_1.Column('character varying', {
        nullable: true,
        length: 255
    }),
    __metadata("design:type", String)
], Shop.prototype, "city", void 0);
__decorate([
    typeorm_1.Column('character varying', {
        nullable: true,
        length: 255
    }),
    __metadata("design:type", String)
], Shop.prototype, "state", void 0);
__decorate([
    typeorm_1.Column('character varying', {
        nullable: true,
        length: 12
    }),
    __metadata("design:type", String)
], Shop.prototype, "phone", void 0);
__decorate([
    typeorm_1.Column('character varying', {
        nullable: true,
        length: 255
    }),
    class_validator_1.IsEmail(),
    __metadata("design:type", String)
], Shop.prototype, "email", void 0);
__decorate([
    typeorm_1.Column('character varying', {
        nullable: true,
        length: 255
    }),
    __metadata("design:type", String)
], Shop.prototype, "web", void 0);
__decorate([
    typeorm_1.Column('character varying', {
        nullable: true,
        length: 255
    }),
    __metadata("design:type", String)
], Shop.prototype, "fb", void 0);
__decorate([
    typeorm_1.OneToMany(type => Order_entity_1.Order, orders => orders.shop),
    __metadata("design:type", Array)
], Shop.prototype, "orders", void 0);
__decorate([
    typeorm_1.OneToMany(type => User_entity_1.User, user => user.shop, {
        cascadeInsert: true,
        cascadeUpdate: true
    }),
    __metadata("design:type", Array)
], Shop.prototype, "admins", void 0);
__decorate([
    typeorm_1.OneToMany(type => Product_entity_1.Product, products => products.shop),
    __metadata("design:type", Array)
], Shop.prototype, "products", void 0);
__decorate([
    typeorm_1.ManyToMany(type => User_entity_1.User, users => users.shops, {
        cascadeInsert: true,
        cascadeUpdate: true
    }),
    typeorm_1.JoinTable(),
    __metadata("design:type", Array)
], Shop.prototype, "users", void 0);
Shop = __decorate([
    typeorm_1.Entity()
], Shop);
exports.Shop = Shop;
//# sourceMappingURL=Shop.entity.js.map