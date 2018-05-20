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
const User_entity_1 = require("./User.entity");
const Item_entity_1 = require("./Item.entity");
const Available_entity_1 = require("./Available.entity");
const Category_entity_1 = require("./Category.entity");
const Day_entity_1 = require("./Day.entity");
let Product = class Product {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Product.prototype, "id", void 0);
__decorate([
    typeorm_1.CreateDateColumn({
        select: false
    }),
    __metadata("design:type", Date)
], Product.prototype, "createdAt", void 0);
__decorate([
    typeorm_1.UpdateDateColumn({
        select: false
    }),
    __metadata("design:type", Date)
], Product.prototype, "updatedAt", void 0);
__decorate([
    typeorm_1.Column('character varying', {
        nullable: false,
        unique: true,
        length: 255
    }),
    __metadata("design:type", String)
], Product.prototype, "name", void 0);
__decorate([
    typeorm_1.Column('real'),
    __metadata("design:type", String)
], Product.prototype, "price", void 0);
__decorate([
    typeorm_1.Column('text', {
        nullable: true
    }),
    __metadata("design:type", String)
], Product.prototype, "description", void 0);
__decorate([
    typeorm_1.Column('character varying', {
        nullable: true,
        unique: false,
        length: 255
    }),
    class_validator_1.IsUrl(),
    __metadata("design:type", String)
], Product.prototype, "image", void 0);
__decorate([
    typeorm_1.Column('integer', {
        nullable: false,
        default: 0
    }),
    __metadata("design:type", Number)
], Product.prototype, "stock", void 0);
__decorate([
    typeorm_1.Column('integer', {
        nullable: false,
        default: 0
    }),
    __metadata("design:type", Number)
], Product.prototype, "stockOut", void 0);
__decorate([
    typeorm_1.ManyToOne(type => Shop_entity_1.Shop, shop => shop.products),
    __metadata("design:type", Shop_entity_1.Shop)
], Product.prototype, "shop", void 0);
__decorate([
    typeorm_1.ManyToMany(type => User_entity_1.User, user => user.products),
    __metadata("design:type", Array)
], Product.prototype, "users", void 0);
__decorate([
    typeorm_1.ManyToMany(type => Category_entity_1.Category, category => category.products),
    typeorm_1.JoinTable(),
    __metadata("design:type", Array)
], Product.prototype, "categories", void 0);
__decorate([
    typeorm_1.OneToMany(type => Day_entity_1.Day, day => day.product),
    __metadata("design:type", Array)
], Product.prototype, "days", void 0);
__decorate([
    typeorm_1.OneToMany(type => Item_entity_1.Item, items => items.product),
    __metadata("design:type", Array)
], Product.prototype, "items", void 0);
__decorate([
    typeorm_1.OneToMany(type => Available_entity_1.Available, avaliables => avaliables.product),
    __metadata("design:type", Array)
], Product.prototype, "avaliables", void 0);
Product = __decorate([
    typeorm_1.Entity()
], Product);
exports.Product = Product;
//# sourceMappingURL=Product.entity.js.map