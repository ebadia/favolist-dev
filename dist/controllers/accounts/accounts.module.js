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
const jwt_strategy_1 = require("./passport/jwt.strategy");
const cors_1 = require("@nest-middlewares/cors");
const accounts_controller_1 = require("./accounts.controller");
const accounts_service_1 = require("./accounts.service");
const User_entity_1 = require("../../entities/User.entity");
let AccountsModule = class AccountsModule {
    configure(consumer) {
        consumer
            .apply(passport.authenticate('jwt', { session: false }))
            .forRoutes({ path: '/accounts/authorized', method: common_1.RequestMethod.GET })
            .apply(cors_1.CorsMiddleware)
            .forRoutes(accounts_controller_1.AccountsController);
    }
};
AccountsModule = __decorate([
    common_1.Module({
        controllers: [accounts_controller_1.AccountsController],
        providers: [accounts_service_1.AccountsService, jwt_strategy_1.SFJwtStrategy],
        imports: [typeorm_1.TypeOrmModule.forFeature([User_entity_1.User])]
    })
], AccountsModule);
exports.AccountsModule = AccountsModule;
//# sourceMappingURL=accounts.module.js.map