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
const common_2 = require("@nestjs/common");
const common_3 = require("@nestjs/common");
const validation_pipe_1 = require("../../common/pipes/validation.pipe");
const parse_int_pipe_1 = require("../../common/pipes/parse-int.pipe");
const mt = require("moment-timezone");
const orders_service_1 = require("./orders.service");
const create_order_dto_1 = require("./dto/create-order.dto");
const update_order_dto_1 = require("./dto/update-order.dto");
const Item_entity_1 = require("../../entities/Item.entity");
const users_service_1 = require("../users/users.service");
const shops_service_1 = require("../shops/shops.service");
const items_service_1 = require("../items/items.service");
const create_item_dto_1 = require("../items/dto/create-item.dto");
let OrdersController = class OrdersController {
    constructor(ordersService, usersService, shopsService, itemsService) {
        this.ordersService = ordersService;
        this.usersService = usersService;
        this.shopsService = shopsService;
        this.itemsService = itemsService;
    }
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.ordersService.findAll();
        });
    }
    findFromShopStatus(id, status) {
        return __awaiter(this, void 0, void 0, function* () {
            const date = mt().tz('Europe/Madrid').format('YYYY-MM-DD');
            return yield this.ordersService.findFromShopStatus(id, date, status);
        });
    }
    find(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.ordersService.find(id);
        });
    }
    create(order) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const anOrder = yield this.ordersService.create(order);
                const aUser = yield this.usersService.findOne(order.user);
                aUser.orders.push(anOrder);
                console.log(aUser);
                yield this.usersService.saveOrder(aUser);
                const aShop = yield this.shopsService.findOne(order.shop);
                aShop.orders.push(anOrder);
                console.log(aShop);
                yield this.shopsService.saveOrder(aShop);
                return yield anOrder;
            }
            catch (error) {
                throw new common_2.BadRequestException(error);
            }
        });
    }
    addItemToOrder(id, item) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const anItem = Object.assign(new Item_entity_1.Item(), item);
                return yield this.ordersService.addItemToOrder(id, anItem);
            }
            catch (error) {
                throw new common_2.BadRequestException(error);
            }
        });
    }
    update(id, order) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.ordersService.update(id, order);
            }
            catch (error) {
                throw new common_2.BadRequestException(error);
            }
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.ordersService.delete(id);
        });
    }
    findTodayFromShop(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const date = mt().tz('Europe/Madrid').format('YYYY-MM-DD');
            return yield this.ordersService.findFromShop(id, date);
        });
    }
    findTodayFromUser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const date = mt().tz('Europe/Madrid').format('YYYY-MM-DD');
            return yield this.ordersService.findFromUser(id, date);
        });
    }
    findTodayFromUserShop(userId, shopId) {
        return __awaiter(this, void 0, void 0, function* () {
            const date = mt().tz('Europe/Madrid').format('YYYY-MM-DD');
            return yield this.ordersService.findFromUserShop(userId, shopId, date);
        });
    }
    findFromTodayFromUserShop(userId, shopId) {
        return __awaiter(this, void 0, void 0, function* () {
            const date = mt().tz('Europe/Madrid').format('YYYY-MM-DD');
            return yield this.ordersService.findFromFromUserShop(userId, shopId, date);
        });
    }
    findDateFromShop(id, date) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.ordersService.findFromShop(id, date);
        });
    }
};
__decorate([
    common_1.Get(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], OrdersController.prototype, "findAll", null);
__decorate([
    common_1.Get('/today/shops/:id/status/:status'),
    __param(0, common_1.Param('id', new parse_int_pipe_1.ParseIntPipe())),
    __param(1, common_1.Param('status')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], OrdersController.prototype, "findFromShopStatus", null);
__decorate([
    common_1.Get(':id'),
    __param(0, common_1.Param('id', new parse_int_pipe_1.ParseIntPipe())),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], OrdersController.prototype, "find", null);
__decorate([
    common_1.Post(),
    common_3.UsePipes(new validation_pipe_1.ValidationPipe()),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_order_dto_1.CreateOrderDto]),
    __metadata("design:returntype", Promise)
], OrdersController.prototype, "create", null);
__decorate([
    common_1.Post(':id/items'),
    common_3.UsePipes(new validation_pipe_1.ValidationPipe()),
    __param(0, common_1.Param('id', new parse_int_pipe_1.ParseIntPipe())),
    __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_item_dto_1.CreateItemDto]),
    __metadata("design:returntype", Promise)
], OrdersController.prototype, "addItemToOrder", null);
__decorate([
    common_1.Patch(':id'),
    common_3.UsePipes(new validation_pipe_1.ValidationPipe()),
    __param(0, common_1.Param('id', new parse_int_pipe_1.ParseIntPipe())),
    __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, update_order_dto_1.UpdateOrderDto]),
    __metadata("design:returntype", Promise)
], OrdersController.prototype, "update", null);
__decorate([
    common_1.Delete(':id'),
    __param(0, common_1.Param('id', new parse_int_pipe_1.ParseIntPipe())),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], OrdersController.prototype, "delete", null);
__decorate([
    common_1.Get('/today/shops/:id'),
    __param(0, common_1.Param('id', new parse_int_pipe_1.ParseIntPipe())),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], OrdersController.prototype, "findTodayFromShop", null);
__decorate([
    common_1.Get('/today/users/:id'),
    __param(0, common_1.Param('id', new parse_int_pipe_1.ParseIntPipe())),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], OrdersController.prototype, "findTodayFromUser", null);
__decorate([
    common_1.Get('/today/users/:userId/shops/:shopId'),
    __param(0, common_1.Param('userId', new parse_int_pipe_1.ParseIntPipe())),
    __param(1, common_1.Param('shopId', new parse_int_pipe_1.ParseIntPipe())),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], OrdersController.prototype, "findTodayFromUserShop", null);
__decorate([
    common_1.Get('/fromtoday/users/:userId/shops/:shopId'),
    __param(0, common_1.Param('userId', new parse_int_pipe_1.ParseIntPipe())),
    __param(1, common_1.Param('shopId', new parse_int_pipe_1.ParseIntPipe())),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], OrdersController.prototype, "findFromTodayFromUserShop", null);
__decorate([
    common_1.Get('/date/shops/:id'),
    __param(0, common_1.Param('id', new parse_int_pipe_1.ParseIntPipe())),
    __param(1, common_1.Query('day')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], OrdersController.prototype, "findDateFromShop", null);
OrdersController = __decorate([
    common_1.Controller('orders'),
    __metadata("design:paramtypes", [orders_service_1.OrdersService,
        users_service_1.UsersService,
        shops_service_1.ShopsService,
        items_service_1.ItemsService])
], OrdersController);
exports.OrdersController = OrdersController;
//# sourceMappingURL=orders.controller.js.map