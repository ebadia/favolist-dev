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
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const cors_1 = require("@nest-middlewares/cors");
const app_controller_1 = require("./app.controller");
const accounts_module_1 = require("./controllers/accounts/accounts.module");
const users_module_1 = require("./controllers/users/users.module");
const shops_module_1 = require("./controllers/shops/shops.module");
const products_module_1 = require("./controllers/products/products.module");
const availables_module_1 = require("./controllers/availables/availables.module");
const orders_module_1 = require("./controllers/orders/orders.module");
const items_module_1 = require("./controllers/items/items.module");
const mails_module_1 = require("./controllers/mails/mails.module");
const events_module_1 = require("./controllers/events/events.module");
const logger_middleware_1 = require("./common/middlewares/logger.middleware");
const mailer_1 = require("@nest-modules/mailer");
const sendinBlue = require("nodemailer-sendinblue-transport");
const days_module_1 = require("./controllers/days/days.module");
let ApplicationModule = class ApplicationModule {
    constructor() { }
    configure(consumer) {
        consumer
            .apply(logger_middleware_1.LoggerMiddleware)
            .with('ApplicationModule')
            .forRoutes(app_controller_1.AppController)
            .apply(cors_1.CorsMiddleware)
            .forRoutes({ path: '*', method: common_1.RequestMethod.ALL });
    }
};
ApplicationModule = __decorate([
    common_1.Module({
        imports: [
            users_module_1.UsersModule,
            shops_module_1.ShopsModule,
            products_module_1.ProductsModule,
            accounts_module_1.AccountsModule,
            availables_module_1.AvailablesModule,
            orders_module_1.OrdersModule,
            items_module_1.ItemsModule,
            events_module_1.EventsModule,
            mails_module_1.MailsModule,
            days_module_1.DaysModule,
            typeorm_1.TypeOrmModule.forRoot(),
            mailer_1.MailerModule.forRoot({
                transport: sendinBlue({
                    auth: {
                        apiUrl: 'https://api.sendinblue.com/v3/',
                        apiKey: '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'
                    }
                }),
                defaults: {
                    from: '"favolist-mailer" <noreply@favolist.com>'
                },
                templateDir: './src/common/email'
            })
        ],
        controllers: [app_controller_1.AppController],
        providers: [],
        exports: []
    }),
    __metadata("design:paramtypes", [])
], ApplicationModule);
exports.ApplicationModule = ApplicationModule;
//# sourceMappingURL=app.module.js.map