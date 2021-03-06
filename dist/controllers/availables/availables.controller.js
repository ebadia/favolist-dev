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
const availables_service_1 = require("./availables.service");
const create_available_dto_1 = require("./dto/create-available.dto");
const update_available_dto_1 = require("./dto/update-available.dto");
let AvailablesController = class AvailablesController {
    constructor(availablesService) {
        this.availablesService = availablesService;
    }
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.availablesService.findAll();
        });
    }
    findFromShop(id, date) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.availablesService.findFromShop(id, date);
        });
    }
    findTodayFromShop(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const date = new Date(Date.now()).toISOString().split('T')[0];
            return yield this.availablesService.findFromShop(id, date);
        });
    }
    findOne(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.availablesService.findOne(id);
        });
    }
    create(available) {
        return __awaiter(this, void 0, void 0, function* () {
            const isCreated = yield this.availablesService.create(available);
            if (isCreated) {
                return yield this.availablesService.findOne(isCreated.id);
            }
            else {
                throw new common_2.ConflictException();
            }
        });
    }
    update(id, available) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.availablesService.update(id, available);
            }
            catch (error) {
                throw new common_2.BadRequestException(error);
            }
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.availablesService.delete(id);
        });
    }
};
__decorate([
    common_1.Get(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AvailablesController.prototype, "findAll", null);
__decorate([
    common_1.Get('/shops/:id'),
    __param(0, common_1.Param('id', new parse_int_pipe_1.ParseIntPipe())),
    __param(1, common_1.Query('date')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AvailablesController.prototype, "findFromShop", null);
__decorate([
    common_1.Get('/today/shops/:id'),
    __param(0, common_1.Param('id', new parse_int_pipe_1.ParseIntPipe())),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AvailablesController.prototype, "findTodayFromShop", null);
__decorate([
    common_1.Get(':id'),
    __param(0, common_1.Param('id', new parse_int_pipe_1.ParseIntPipe())),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AvailablesController.prototype, "findOne", null);
__decorate([
    common_1.Post(),
    common_3.UsePipes(new validation_pipe_1.ValidationPipe()),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_available_dto_1.CreateAvailableDto]),
    __metadata("design:returntype", Promise)
], AvailablesController.prototype, "create", null);
__decorate([
    common_2.Patch(':id'),
    __param(0, common_1.Param('id', new parse_int_pipe_1.ParseIntPipe())),
    __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, update_available_dto_1.UpdateAvailableDto]),
    __metadata("design:returntype", Promise)
], AvailablesController.prototype, "update", null);
__decorate([
    common_2.Delete(':id'),
    __param(0, common_1.Param('id', new parse_int_pipe_1.ParseIntPipe())),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AvailablesController.prototype, "delete", null);
AvailablesController = __decorate([
    common_1.Controller('availables'),
    __metadata("design:paramtypes", [availables_service_1.AvailablesService])
], AvailablesController);
exports.AvailablesController = AvailablesController;
//# sourceMappingURL=availables.controller.js.map