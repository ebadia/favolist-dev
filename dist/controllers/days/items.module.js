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
const items_controller_1 = require("./items.controller");
const items_service_1 = require("./items.service");
const Item_entity_1 = require("../../entities/Item.entity");
let ItemsModule = class ItemsModule {
    configure(consumer) {
        consumer
            .apply(passport.authenticate('jwt', { session: false }))
            .forRoutes(items_controller_1.DaysController)
            .apply(logger_middleware_1.LoggerMiddleware)
            .with('Items')
            .forRoutes(items_controller_1.DaysController)
            .apply(cors_1.CorsMiddleware)
            .forRoutes(items_controller_1.DaysController);
    }
};
ItemsModule = __decorate([
    common_1.Module({
        providers: [items_service_1.ItemsService],
        controllers: [items_controller_1.DaysController],
        imports: [typeorm_1.TypeOrmModule.forFeature([Item_entity_1.Item])],
        exports: [items_service_1.ItemsService]
    })
], ItemsModule);
exports.ItemsModule = ItemsModule;
//# sourceMappingURL=items.module.js.map