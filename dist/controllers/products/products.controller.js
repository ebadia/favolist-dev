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
const products_service_1 = require("./products.service");
const Product_entity_1 = require("../../entities/Product.entity");
const create_product_dto_1 = require("./dto/create-product.dto");
let ProductsController = class ProductsController {
    constructor(productsService) {
        this.productsService = productsService;
    }
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.productsService.findAll();
        });
    }
    findOne(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.productsService.findOne(id);
        });
    }
    findAllShops() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.productsService.findAllShops();
        });
    }
    findAllDays() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.productsService.findAllDays();
        });
    }
    getAllDays() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.productsService.getAllDays();
        });
    }
    create(product) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.productsService.create(product);
        });
    }
    addDays(id, day) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.productsService.addDays(id, day);
        });
    }
    addCategories(id, day) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.productsService.addCategories(id, day);
        });
    }
    update(id, product) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.productsService.update(id, product);
            }
            catch (error) {
                throw new common_1.BadRequestException(error);
            }
        });
    }
    updateDay(id, dayId, status) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.productsService.updateDay(id, dayId, status);
            }
            catch (error) {
                throw new common_1.BadRequestException(error);
            }
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.productsService.delete(id);
        });
    }
    todayProducts() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.productsService.getTodayProducts();
        });
    }
};
__decorate([
    common_1.Get(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "findAll", null);
__decorate([
    common_1.Get('edit/:id'),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "findOne", null);
__decorate([
    common_1.Get('shops'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "findAllShops", null);
__decorate([
    common_1.Get('days'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "findAllDays", null);
__decorate([
    common_1.Get('all/days'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "getAllDays", null);
__decorate([
    common_1.Post(),
    common_2.UsePipes(new validation_pipe_1.ValidationPipe()),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_product_dto_1.CreateProductDto]),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "create", null);
__decorate([
    common_1.Post(':id/days'),
    __param(0, common_1.Param('id', new parse_int_pipe_1.ParseIntPipe())),
    __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "addDays", null);
__decorate([
    common_1.Post(':id/categories'),
    __param(0, common_1.Param('id', new parse_int_pipe_1.ParseIntPipe())),
    __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "addCategories", null);
__decorate([
    common_1.Patch(':id'),
    __param(0, common_1.Param('id', new parse_int_pipe_1.ParseIntPipe())),
    __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Product_entity_1.Product]),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "update", null);
__decorate([
    common_1.Get(':id/days/:dayId/status/:status'),
    __param(0, common_1.Param('id', new parse_int_pipe_1.ParseIntPipe())),
    __param(1, common_1.Param('dayId')),
    __param(2, common_1.Param('status')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number, String]),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "updateDay", null);
__decorate([
    common_1.Delete(':id'),
    __param(0, common_1.Param('id', new parse_int_pipe_1.ParseIntPipe())),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "delete", null);
__decorate([
    common_1.Get('today'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "todayProducts", null);
ProductsController = __decorate([
    common_1.Controller('products'),
    __metadata("design:paramtypes", [products_service_1.ProductsService])
], ProductsController);
exports.ProductsController = ProductsController;
//# sourceMappingURL=products.controller.js.map