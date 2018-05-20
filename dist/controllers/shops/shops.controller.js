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
const shops_service_1 = require("./shops.service");
const create_shop_dto_1 = require("./dto/create-shop.dto");
const update_shop_dto_1 = require("./dto/update-shop.dto");
const create_admin_dto_1 = require("../users/dto/create-admin.dto");
const assign_shop_dto_1 = require("../shops/dto/assign-shop.dto");
let ShopsController = class ShopsController {
    constructor(shopsService) {
        this.shopsService = shopsService;
    }
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.shopsService.findAll();
        });
    }
    findAllWithUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.shopsService.findAllWithUsers();
        });
    }
    findAllWithProducts() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.shopsService.findAllWithProducts();
        });
    }
    findOneWithUsers(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.shopsService.findOneWithUsers(id);
        });
    }
    findOneWithProducts(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.shopsService.findOneWithProducts(id);
        });
    }
    findOneWithAdmins(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.shopsService.findOneWithAdmins(id);
        });
    }
    findOneWithOrders(id, day) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.shopsService.findOneWithOrders(id, day);
        });
    }
    findOne(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.shopsService.findOne(id);
        });
    }
    create(shop) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.shopsService.create(shop);
            }
            catch (error) {
                throw new common_1.BadRequestException(error);
            }
        });
    }
    update(id, shop) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.shopsService.update(id, shop);
            }
            catch (error) {
                throw new common_1.BadRequestException(error);
            }
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.shopsService.delete(id);
        });
    }
    addProductToShop(id, product) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.shopsService.addProductToShop(id, product);
            }
            catch (error) {
                throw new common_1.BadRequestException(error);
            }
        });
    }
    addAdminToShop(id, admin) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.shopsService.addAdminToShop(id, admin);
            }
            catch (error) {
                throw new common_1.BadRequestException(error);
            }
        });
    }
};
__decorate([
    common_1.Get(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ShopsController.prototype, "findAll", null);
__decorate([
    common_1.Get('users'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ShopsController.prototype, "findAllWithUsers", null);
__decorate([
    common_1.Get('products'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ShopsController.prototype, "findAllWithProducts", null);
__decorate([
    common_1.Get(':id/users'),
    __param(0, common_1.Param('id', new parse_int_pipe_1.ParseIntPipe())),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ShopsController.prototype, "findOneWithUsers", null);
__decorate([
    common_1.Get(':id/products'),
    __param(0, common_1.Param('id', new parse_int_pipe_1.ParseIntPipe())),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ShopsController.prototype, "findOneWithProducts", null);
__decorate([
    common_1.Get(':id/admins'),
    __param(0, common_1.Param('id', new parse_int_pipe_1.ParseIntPipe())),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ShopsController.prototype, "findOneWithAdmins", null);
__decorate([
    common_1.Get(':id/orders'),
    __param(0, common_1.Param('id', new parse_int_pipe_1.ParseIntPipe())),
    __param(1, common_1.Query('day')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ShopsController.prototype, "findOneWithOrders", null);
__decorate([
    common_1.Get(':id'),
    __param(0, common_1.Param('id', new parse_int_pipe_1.ParseIntPipe())),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ShopsController.prototype, "findOne", null);
__decorate([
    common_1.Post(),
    common_2.UsePipes(new validation_pipe_1.ValidationPipe()),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_shop_dto_1.CreateShopDto]),
    __metadata("design:returntype", Promise)
], ShopsController.prototype, "create", null);
__decorate([
    common_1.Patch(':id'),
    common_2.UsePipes(new validation_pipe_1.ValidationPipe()),
    __param(0, common_1.Param('id', new parse_int_pipe_1.ParseIntPipe())),
    __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, update_shop_dto_1.UpdateShopDto]),
    __metadata("design:returntype", Promise)
], ShopsController.prototype, "update", null);
__decorate([
    common_1.Delete(':id'),
    __param(0, common_1.Param('id', new parse_int_pipe_1.ParseIntPipe())),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ShopsController.prototype, "delete", null);
__decorate([
    common_1.Post(':id/products'),
    __param(0, common_1.Param('id', new parse_int_pipe_1.ParseIntPipe())),
    __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, assign_shop_dto_1.AssignShopDto]),
    __metadata("design:returntype", Promise)
], ShopsController.prototype, "addProductToShop", null);
__decorate([
    common_1.Post(':id/admins'),
    __param(0, common_1.Param('id', new parse_int_pipe_1.ParseIntPipe())),
    __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_admin_dto_1.CreateAdminDto]),
    __metadata("design:returntype", Promise)
], ShopsController.prototype, "addAdminToShop", null);
ShopsController = __decorate([
    common_1.Controller('shops'),
    __metadata("design:paramtypes", [shops_service_1.ShopsService])
], ShopsController);
exports.ShopsController = ShopsController;
//# sourceMappingURL=shops.controller.js.map