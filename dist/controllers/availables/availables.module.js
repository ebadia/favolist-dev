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
const availables_controller_1 = require("./availables.controller");
const availables_service_1 = require("./availables.service");
const Available_entity_1 = require("../../entities/Available.entity");
let AvailablesModule = class AvailablesModule {
    configure(consumer) {
        consumer
            .apply(passport.authenticate('jwt', { session: false }))
            .forRoutes(availables_controller_1.AvailablesController)
            .apply(logger_middleware_1.LoggerMiddleware)
            .with('Available')
            .forRoutes(availables_controller_1.AvailablesController)
            .apply(cors_1.CorsMiddleware)
            .forRoutes(availables_controller_1.AvailablesController);
    }
};
AvailablesModule = __decorate([
    common_1.Module({
        controllers: [availables_controller_1.AvailablesController],
        providers: [availables_service_1.AvailablesService],
        imports: [typeorm_1.TypeOrmModule.forFeature([Available_entity_1.Available])]
    })
], AvailablesModule);
exports.AvailablesModule = AvailablesModule;
//# sourceMappingURL=availables.module.js.map