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
const Item_entity_1 = require("./Item.entity");
const Shop_entity_1 = require("./Shop.entity");
const User_entity_1 = require("./User.entity");
const enums_1 = require("../common/interfaces/enums");
let Order = class Order extends typeorm_1.BaseEntity {
    static getOrderTotal(id) {
        return this.query(`
        SELECT
        SUM("item"."quantity" * "product"."price")
        FROM
        "order"
        JOIN "item"
        ON "order"."id" = "item"."orderId"
        JOIN "product"
        ON "item"."productId" = "product"."id"
        WHERE
        "order"."id" = ${id}
      `);
    }
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Order.prototype, "id", void 0);
__decorate([
    typeorm_1.CreateDateColumn({
        select: false
    }),
    __metadata("design:type", Date)
], Order.prototype, "createdAt", void 0);
__decorate([
    typeorm_1.UpdateDateColumn({
        select: false
    }),
    __metadata("design:type", Date)
], Order.prototype, "updatedAt", void 0);
__decorate([
    typeorm_1.Column('date', {
        nullable: true
    }),
    __metadata("design:type", String)
], Order.prototype, "day", void 0);
__decorate([
    typeorm_1.Column('time', {
        nullable: true
    }),
    __metadata("design:type", String)
], Order.prototype, "hour", void 0);
__decorate([
    typeorm_1.Column('character varying', {
        nullable: true,
        default: String(enums_1.status.ORDERING),
        length: 100
    }),
    __metadata("design:type", String)
], Order.prototype, "status", void 0);
__decorate([
    typeorm_1.OneToMany(type => Item_entity_1.Item, items => items.order, {
        cascadeInsert: true,
        cascadeUpdate: true
    }),
    __metadata("design:type", Array)
], Order.prototype, "items", void 0);
__decorate([
    typeorm_1.ManyToOne(type => Shop_entity_1.Shop, shop => shop.orders),
    __metadata("design:type", Shop_entity_1.Shop)
], Order.prototype, "shop", void 0);
__decorate([
    typeorm_1.ManyToOne(type => User_entity_1.User, user => user.orders),
    __metadata("design:type", User_entity_1.User)
], Order.prototype, "user", void 0);
Order = __decorate([
    typeorm_1.Entity()
], Order);
exports.Order = Order;
//# sourceMappingURL=Order.entity.js.map