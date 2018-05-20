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
const validation_pipe_1 = require("../../common/pipes/validation.pipe");
const parse_int_pipe_1 = require("../../common/pipes/parse-int.pipe");
const create_user_dto_1 = require("./dto/create-user.dto");
const update_user_dto_1 = require("./dto/update-user.dto");
const add_role_dto_1 = require("./dto/add-role.dto");
const create_shop_dto_1 = require("../shops/dto/create-shop.dto");
const users_service_1 = require("./users.service");
const mails_service_1 = require("../mails/mails.service");
let UsersController = class UsersController {
    constructor(usersService, mailService) {
        this.usersService = usersService;
        this.mailService = mailService;
    }
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.usersService.findAll();
        });
    }
    findWithShops() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.usersService.findWithShops();
        });
    }
    findOne(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.usersService.findOne(id);
        });
    }
    findOneWithShops(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.usersService.findOneWithShops(id);
        });
    }
    findOneAdminShop(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.usersService.findOneAdminShop(id);
        });
    }
    addShopToUser(id, shop) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.usersService.addShopToUser(id, shop);
            }
            catch (error) {
                throw new common_1.BadRequestException(error);
            }
        });
    }
    create(user) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const newUser = yield this.usersService.create(user);
                yield this.mailService.welcome(user);
                return newUser;
            }
            catch (error) {
                throw new common_1.BadRequestException(error);
            }
        });
    }
    update(id, user) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.usersService.update(id, user);
            }
            catch (error) {
                throw new common_1.BadRequestException(error);
            }
        });
    }
    addRole(id, role) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.usersService.addRole(id, role);
            }
            catch (error) {
                throw new common_1.BadRequestException(error);
            }
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.usersService.delete(id);
        });
    }
    removeShopFromUser(userId, shopId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.usersService.removeShopFromUser(userId, shopId);
        });
    }
};
__decorate([
    common_1.Get(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "findAll", null);
__decorate([
    common_1.Get('shops'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "findWithShops", null);
__decorate([
    common_1.Get(':id'),
    __param(0, common_1.Param('id', new parse_int_pipe_1.ParseIntPipe())),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "findOne", null);
__decorate([
    common_1.Get(':id/shops'),
    __param(0, common_1.Param('id', new parse_int_pipe_1.ParseIntPipe())),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "findOneWithShops", null);
__decorate([
    common_1.Get(':id/admins'),
    __param(0, common_1.Param('id', new parse_int_pipe_1.ParseIntPipe())),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "findOneAdminShop", null);
__decorate([
    common_1.Post(':id/shops'),
    common_2.UsePipes(new validation_pipe_1.ValidationPipe()),
    __param(0, common_1.Param('id', new parse_int_pipe_1.ParseIntPipe())),
    __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_shop_dto_1.CreateShopDto]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "addShopToUser", null);
__decorate([
    common_1.Post(),
    common_2.UsePipes(new validation_pipe_1.ValidationPipe()),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_user_dto_1.CreateUserDto]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "create", null);
__decorate([
    common_1.Patch(':id'),
    common_2.UsePipes(new validation_pipe_1.ValidationPipe()),
    __param(0, common_1.Param('id', new parse_int_pipe_1.ParseIntPipe())),
    __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, update_user_dto_1.UpdateUserDto]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "update", null);
__decorate([
    common_1.Post(':id/roles'),
    common_2.UsePipes(new validation_pipe_1.ValidationPipe()),
    __param(0, common_1.Param('id', new parse_int_pipe_1.ParseIntPipe())),
    __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, add_role_dto_1.AddRoleDto]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "addRole", null);
__decorate([
    common_1.Delete(':id'),
    __param(0, common_1.Param('id', new parse_int_pipe_1.ParseIntPipe())),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "delete", null);
__decorate([
    common_1.Delete(':userId/shops/:shopId'),
    __param(0, common_1.Param('userId', new parse_int_pipe_1.ParseIntPipe())),
    __param(1, common_1.Param('shopId', new parse_int_pipe_1.ParseIntPipe())),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "removeShopFromUser", null);
UsersController = __decorate([
    common_1.Controller('users'),
    __metadata("design:paramtypes", [users_service_1.UsersService,
        mails_service_1.MailsService])
], UsersController);
exports.UsersController = UsersController;
//# sourceMappingURL=users.controller.js.map