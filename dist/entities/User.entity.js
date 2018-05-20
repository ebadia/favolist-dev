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
const Shop_entity_1 = require("./Shop.entity");
const Product_entity_1 = require("./Product.entity");
const Order_entity_1 = require("./Order.entity");
const Role_entity_1 = require("./Role.entity");
let User = class User {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], User.prototype, "id", void 0);
__decorate([
    typeorm_1.CreateDateColumn({
        select: false
    }),
    __metadata("design:type", Date)
], User.prototype, "createdAt", void 0);
__decorate([
    typeorm_1.UpdateDateColumn({
        select: false
    }),
    __metadata("design:type", Date)
], User.prototype, "updatedAt", void 0);
__decorate([
    typeorm_1.Column('character varying', {
        nullable: true,
        length: 255
    }),
    __metadata("design:type", String)
], User.prototype, "first_name", void 0);
__decorate([
    typeorm_1.Column('character varying', {
        nullable: true,
        length: 255
    }),
    __metadata("design:type", String)
], User.prototype, "last_name", void 0);
__decorate([
    typeorm_1.Column('character varying', {
        nullable: true,
        unique: true,
        length: 255
    }),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    typeorm_1.Column('character varying', {
        nullable: true,
        unique: true,
        length: 12
    }),
    __metadata("design:type", String)
], User.prototype, "mobile", void 0);
__decorate([
    typeorm_1.Column('character varying', {
        nullable: true,
        length: 12
    }),
    __metadata("design:type", String)
], User.prototype, "phone", void 0);
__decorate([
    typeorm_1.Column('character varying', {
        nullable: false,
        unique: true,
        length: 255
    }),
    __metadata("design:type", String)
], User.prototype, "username", void 0);
__decorate([
    typeorm_1.Column('character varying', {
        nullable: false,
        length: 100,
        select: false
    }),
    class_validator_1.MinLength(5),
    class_validator_1.MaxLength(100),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    typeorm_1.ManyToMany(type => Shop_entity_1.Shop, shops => shops.users),
    __metadata("design:type", Array)
], User.prototype, "shops", void 0);
__decorate([
    typeorm_1.ManyToMany(type => Role_entity_1.Role, roles => roles.users),
    __metadata("design:type", Array)
], User.prototype, "roles", void 0);
__decorate([
    typeorm_1.ManyToMany(type => Product_entity_1.Product, products => products.users),
    typeorm_1.JoinTable(),
    __metadata("design:type", Array)
], User.prototype, "products", void 0);
__decorate([
    typeorm_1.OneToMany(type => Order_entity_1.Order, orders => orders.user),
    __metadata("design:type", Array)
], User.prototype, "orders", void 0);
__decorate([
    typeorm_1.ManyToOne(type => Shop_entity_1.Shop, shop => shop.admins),
    __metadata("design:type", Shop_entity_1.Shop)
], User.prototype, "shop", void 0);
User = __decorate([
    typeorm_1.Entity()
], User);
exports.User = User;
//# sourceMappingURL=User.entity.js.map