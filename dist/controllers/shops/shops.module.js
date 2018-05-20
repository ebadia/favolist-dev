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
const requestTime_middleware_1 = require("../../common/middlewares/requestTime.middleware");
const shops_controller_1 = require("./shops.controller");
const shops_service_1 = require("./shops.service");
const Shop_entity_1 = require("../../entities/Shop.entity");
let ShopsModule = class ShopsModule {
    configure(consumer) {
        consumer
            .apply(passport.authenticate('jwt', { session: false }))
            .forRoutes(shops_controller_1.ShopsController)
            .apply(logger_middleware_1.LoggerMiddleware)
            .with('Shop')
            .forRoutes(shops_controller_1.ShopsController)
            .apply(requestTime_middleware_1.RequestTime)
            .forRoutes(shops_controller_1.ShopsController)
            .apply(cors_1.CorsMiddleware)
            .forRoutes(shops_controller_1.ShopsController);
    }
};
ShopsModule = __decorate([
    common_1.Module({
        controllers: [shops_controller_1.ShopsController],
        providers: [shops_service_1.ShopsService],
        exports: [shops_service_1.ShopsService],
        imports: [typeorm_1.TypeOrmModule.forFeature([Shop_entity_1.Shop])]
    })
], ShopsModule);
exports.ShopsModule = ShopsModule;
//# sourceMappingURL=shops.module.js.map