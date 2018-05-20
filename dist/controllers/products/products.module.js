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
const products_controller_1 = require("./products.controller");
const products_service_1 = require("./products.service");
const Product_entity_1 = require("../../entities/Product.entity");
let ProductsModule = class ProductsModule {
    configure(consumer) {
        consumer
            .apply(passport.authenticate('jwt', { session: false }))
            .forRoutes(products_controller_1.ProductsController)
            .apply(logger_middleware_1.LoggerMiddleware)
            .with('Product')
            .forRoutes(products_controller_1.ProductsController)
            .apply(cors_1.CorsMiddleware)
            .forRoutes(products_controller_1.ProductsController);
    }
};
ProductsModule = __decorate([
    common_1.Module({
        controllers: [products_controller_1.ProductsController],
        providers: [products_service_1.ProductsService],
        imports: [typeorm_1.TypeOrmModule.forFeature([Product_entity_1.Product])]
    })
], ProductsModule);
exports.ProductsModule = ProductsModule;
//# sourceMappingURL=products.module.js.map