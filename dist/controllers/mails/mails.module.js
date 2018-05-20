"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const passport = require("passport");
const cors_1 = require("@nest-middlewares/cors");
const logger_middleware_1 = require("../../common/middlewares/logger.middleware");
const mails_controller_1 = require("./mails.controller");
const mails_service_1 = require("./mails.service");
let MailsModule = class MailsModule {
    configure(consumer) {
        consumer
            .apply(passport.authenticate('jwt', { session: false }))
            .forRoutes(mails_controller_1.MailsController)
            .apply(logger_middleware_1.LoggerMiddleware)
            .with('Mails')
            .forRoutes(mails_controller_1.MailsController)
            .apply(cors_1.CorsMiddleware)
            .forRoutes(mails_controller_1.MailsController);
    }
};
MailsModule = __decorate([
    common_1.Module({
        controllers: [mails_controller_1.MailsController],
        providers: [mails_service_1.MailsService],
        exports: [mails_service_1.MailsService]
    })
], MailsModule);
exports.MailsModule = MailsModule;
//# sourceMappingURL=mails.module.js.map