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
const common_3 = require("@nestjs/common");
const validation_pipe_1 = require("../../common/pipes/validation.pipe");
const parse_int_pipe_1 = require("../../common/pipes/parse-int.pipe");
const items_service_1 = require("./items.service");
const create_item_dto_1 = require("./dto/create-item.dto");
const update_item_dto_1 = require("./dto/update-item.dto");
let ItemsController = class ItemsController {
    constructor(itemsService) {
        this.itemsService = itemsService;
    }
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.itemsService.findAll();
        });
    }
    find(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.itemsService.find(id);
        });
    }
    create(item) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.itemsService.create(item);
            }
            catch (error) {
                throw new common_2.BadRequestException(error);
            }
        });
    }
    update(id, item) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.itemsService.update(id, item);
            }
            catch (error) {
                throw new common_2.BadRequestException(error);
            }
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.itemsService.delete(id);
        });
    }
};
__decorate([
    common_1.Get(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ItemsController.prototype, "findAll", null);
__decorate([
    common_1.Get(':id'),
    __param(0, common_1.Param('id', new parse_int_pipe_1.ParseIntPipe())),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ItemsController.prototype, "find", null);
__decorate([
    common_1.Post(),
    common_3.UsePipes(new validation_pipe_1.ValidationPipe()),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_item_dto_1.CreateItemDto]),
    __metadata("design:returntype", Promise)
], ItemsController.prototype, "create", null);
__decorate([
    common_1.Patch(':id'),
    common_3.UsePipes(new validation_pipe_1.ValidationPipe()),
    __param(0, common_1.Param('id', new parse_int_pipe_1.ParseIntPipe())), __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, update_item_dto_1.UpdateItemDto]),
    __metadata("design:returntype", Promise)
], ItemsController.prototype, "update", null);
__decorate([
    common_1.Delete(':id'),
    __param(0, common_1.Param('id', new parse_int_pipe_1.ParseIntPipe())),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ItemsController.prototype, "delete", null);
ItemsController = __decorate([
    common_1.Controller('items'),
    __metadata("design:paramtypes", [items_service_1.ItemsService])
], ItemsController);
exports.ItemsController = ItemsController;
//# sourceMappingURL=items.controller.js.map