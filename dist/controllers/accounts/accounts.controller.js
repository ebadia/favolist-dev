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
const login_user_dto_1 = require("./dto/login-user.dto");
const accounts_service_1 = require("./accounts.service");
const create_user_dto_1 = require("../users/dto/create-user.dto");
let AccountsController = class AccountsController {
    constructor(accountsService) {
        this.accountsService = accountsService;
    }
    login(user, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield this.accountsService.login(user);
                const theUser = yield this.accountsService.findOne(user);
                return res
                    .set('Access-Control-Expose-Headers', 'Authorization')
                    .set('Authorization', 'Bearer ' + response.access_token)
                    .send(theUser);
            }
            catch (error) {
                throw new common_2.BadRequestException(error);
            }
        });
    }
    create(user) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.accountsService.create(user);
            }
            catch (error) {
                throw new common_2.BadRequestException(error);
            }
        });
    }
    authorized() {
        return __awaiter(this, void 0, void 0, function* () {
            return 'Authorized route...!';
        });
    }
    findUserName(username) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.accountsService.findUserName(username);
        });
    }
};
__decorate([
    common_1.Post('login'),
    common_2.HttpCode(common_2.HttpStatus.OK),
    __param(0, common_1.Body()), __param(1, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [login_user_dto_1.LoginUserDto, Object]),
    __metadata("design:returntype", Promise)
], AccountsController.prototype, "login", null);
__decorate([
    common_1.Post(),
    common_2.HttpCode(common_2.HttpStatus.OK),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_user_dto_1.CreateUserDto]),
    __metadata("design:returntype", Promise)
], AccountsController.prototype, "create", null);
__decorate([
    common_1.Get('authorized'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AccountsController.prototype, "authorized", null);
__decorate([
    common_1.Get('username/:username'),
    __param(0, common_1.Param('username')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AccountsController.prototype, "findUserName", null);
AccountsController = __decorate([
    common_1.Controller('accounts'),
    __metadata("design:paramtypes", [accounts_service_1.AccountsService])
], AccountsController);
exports.AccountsController = AccountsController;
//# sourceMappingURL=accounts.controller.js.map