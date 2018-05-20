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
const websockets_1 = require("@nestjs/websockets");
require("rxjs/add/observable/from");
require("rxjs/add/operator/map");
const Order_entity_1 = require("../../entities/Order.entity");
let OrdersService = class OrdersService {
    constructor(ordersRepo) {
        this.ordersRepo = ordersRepo;
    }
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.ordersRepo.find({
                relations: ['user', 'shop', 'items', 'items.product']
            });
        });
    }
    findAllByStatus(status) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.ordersRepo.find({
                where: { status },
                relations: ['user', 'shop', 'items', 'items.product']
            });
        });
    }
    find(id) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('GET CONTROLLER');
            const total = yield Order_entity_1.Order.getOrderTotal(id);
            const order = yield this.ordersRepo.findOneById(id, {
                relations: ['items', 'items.product']
            });
            return Object.assign(order, {
                total: total[0].sum
            });
        });
    }
    create(order) {
        return __awaiter(this, void 0, void 0, function* () {
            const anOrder = Object.assign(new Order_entity_1.Order(), order);
            this.server.emit('new order', { event: 'new order', data: anOrder });
            return yield this.ordersRepo.save(anOrder);
        });
    }
    update(id, order) {
        return __awaiter(this, void 0, void 0, function* () {
            const anOrder = Object.assign(new Order_entity_1.Order(), order);
            yield this.ordersRepo.updateById(id, anOrder);
            return yield this.ordersRepo.findOneById(id);
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const anOrder = yield this.ordersRepo.findOneById(id);
            yield this.ordersRepo.remove(anOrder);
        });
    }
    findFromShop(id, date) {
        return __awaiter(this, void 0, void 0, function* () {
            const finded = yield this.ordersRepo
                .createQueryBuilder('order')
                .leftJoinAndSelect('order.user', 'user')
                .leftJoinAndSelect('order.items', 'items')
                .leftJoinAndSelect('items.product', 'product')
                .where('order.shop.id=:id', {
                id
            })
                .andWhere('order.day=:date', {
                date
            })
                .getMany();
            this.server.emit('today orders', { event: 'today orders', data: true });
            return finded;
        });
    }
    findFromShopStatus(id, date, status) {
        return __awaiter(this, void 0, void 0, function* () {
            const finded = yield this.ordersRepo
                .createQueryBuilder('order')
                .leftJoinAndSelect('order.user', 'user')
                .leftJoinAndSelect('order.items', 'items')
                .leftJoinAndSelect('items.product', 'product')
                .where('order.shop.id=:id', {
                id
            })
                .andWhere('order.day=:date', {
                date
            })
                .andWhere('order.status=:status', {
                status
            })
                .getMany();
            this.server.emit('today orders', { event: 'today orders', data: true });
            return finded;
        });
    }
    addItemToOrder(id, item) {
        return __awaiter(this, void 0, void 0, function* () {
            const order = yield this.ordersRepo.findOneById(id, {
                relations: ['items']
            });
            order.items.push(item);
            yield this.ordersRepo.save(order);
            return yield this.ordersRepo.findOneById(id, { relations: ['items'] });
        });
    }
    findFromUser(id, date) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.ordersRepo
                .createQueryBuilder('order')
                .leftJoinAndSelect('order.shop', 'shop')
                .leftJoinAndSelect('order.items', 'items')
                .leftJoinAndSelect('items.product', 'product')
                .where('order.user.id=:id', { id })
                .andWhere('order.day=:date', { date })
                .getMany();
        });
    }
    findFromUserShop(userId, shopId, date) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.ordersRepo
                .createQueryBuilder('order')
                .leftJoinAndSelect('order.shop', 'shop')
                .leftJoinAndSelect('order.user', 'user')
                .leftJoinAndSelect('order.items', 'items')
                .leftJoinAndSelect('items.product', 'product')
                .where('order.user.id=:userId', { userId })
                .andWhere('order.shop.id=:shopId', { shopId })
                .andWhere('order.day=:date', { date })
                .getMany();
        });
    }
    findFromFromUserShop(userId, shopId, date) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.ordersRepo
                .createQueryBuilder('order')
                .leftJoinAndSelect('order.shop', 'shop')
                .leftJoinAndSelect('order.user', 'user')
                .leftJoinAndSelect('order.items', 'items')
                .leftJoinAndSelect('items.product', 'product')
                .where('order.user.id=:userId', { userId })
                .andWhere('order.shop.id=:shopId', { shopId })
                .andWhere('order.day>=:date', { date })
                .getMany();
        });
    }
    onCreateOrder(client, data) {
        const event = 'new order';
        return { event, data: true };
    }
    onTodayOrders(client, data) {
        const event = 'new order';
        return { event, data: true };
    }
};
__decorate([
    websockets_1.WebSocketServer(),
    __metadata("design:type", Object)
], OrdersService.prototype, "server", void 0);
__decorate([
    websockets_1.SubscribeMessage('new order'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Object)
], OrdersService.prototype, "onCreateOrder", null);
__decorate([
    websockets_1.SubscribeMessage('today orders'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Object)
], OrdersService.prototype, "onTodayOrders", null);
OrdersService = __decorate([
    common_1.Component(),
    websockets_1.WebSocketGateway(),
    __param(0, typeorm_1.InjectRepository(Order_entity_1.Order)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], OrdersService);
exports.OrdersService = OrdersService;
//# sourceMappingURL=orders.service.js.map