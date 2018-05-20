"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const passport = require("passport");
const cors_1 = require("@nest-middlewares/cors");
const logger_middleware_1 = require("../../common/middlewares/logger.middleware");
const orders_controller_1 = require("./orders.controller");
const orders_service_1 = require("./orders.service");
const Order_entity_1 = require("../../entities/Order.entity");
const users_module_1 = require("../users/users.module");
const shops_module_1 = require("../shops/shops.module");
const items_module_1 = require("../items/items.module");
let OrdersModule = class OrdersModule {
    configure(consumer) {
        consumer
            .apply(passport.authenticate('jwt', { session: false }))
            .forRoutes(orders_controller_1.OrdersController)
            .apply(logger_middleware_1.LoggerMiddleware)
            .with('Orders')
            .forRoutes(orders_controller_1.OrdersController)
            .apply(cors_1.CorsMiddleware)
            .forRoutes(orders_controller_1.OrdersController);
    }
};
OrdersModule = __decorate([
    common_1.Module({
        providers: [orders_service_1.OrdersService],
        controllers: [orders_controller_1.OrdersController],
        imports: [
            typeorm_1.TypeOrmModule.forFeature([Order_entity_1.Order]),
            users_module_1.UsersModule,
            shops_module_1.ShopsModule,
            items_module_1.ItemsModule
        ]
    })
], OrdersModule);
exports.OrdersModule = OrdersModule;
//# sourceMappingURL=orders.module.js.map