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
const logger_middleware_1 = require("../../common/middlewares/logger.middleware");
const requestTime_middleware_1 = require("../../common/middlewares/requestTime.middleware");
const users_controller_1 = require("./users.controller");
const users_service_1 = require("./users.service");
const User_entity_1 = require("../../entities/User.entity");
const mails_module_1 = require("../mails/mails.module");
let UsersModule = class UsersModule {
    configure(consumer) {
        consumer
            .apply(passport.authenticate('jwt', { session: false }))
            .forRoutes(users_controller_1.UsersController)
            .apply(logger_middleware_1.LoggerMiddleware)
            .with('User')
            .forRoutes(users_controller_1.UsersController)
            .apply(requestTime_middleware_1.RequestTime)
            .forRoutes(users_controller_1.UsersController);
    }
};
UsersModule = __decorate([
    common_1.Module({
        controllers: [users_controller_1.UsersController],
        providers: [users_service_1.UsersService],
        imports: [typeorm_1.TypeOrmModule.forFeature([User_entity_1.User]), mails_module_1.MailsModule],
        exports: [users_service_1.UsersService]
    })
], UsersModule);
exports.UsersModule = UsersModule;
//# sourceMappingURL=users.module.js.map