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
const days_service_1 = require("./days.service");
const create_day_dto_1 = require("./dto/create-day.dto");
const update_day_dto_1 = require("./dto/update-day.dto");
let DaysController = class DaysController {
    constructor(service) {
        this.service = service;
    }
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.service.findAll();
        });
    }
    find(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.service.find(id);
        });
    }
    create(item) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.service.create(item);
            }
            catch (error) {
                throw new common_2.BadRequestException(error);
            }
        });
    }
    update(id, item) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.service.update(id, item);
            }
            catch (error) {
                throw new common_2.BadRequestException(error);
            }
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.service.delete(id);
        });
    }
};
__decorate([
    common_1.Get(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], DaysController.prototype, "findAll", null);
__decorate([
    common_1.Get(':id'),
    __param(0, common_1.Param('id', new parse_int_pipe_1.ParseIntPipe())),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], DaysController.prototype, "find", null);
__decorate([
    common_1.Post(),
    common_3.UsePipes(new validation_pipe_1.ValidationPipe()),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_day_dto_1.CreateDayDto]),
    __metadata("design:returntype", Promise)
], DaysController.prototype, "create", null);
__decorate([
    common_1.Patch(':id'),
    common_3.UsePipes(new validation_pipe_1.ValidationPipe()),
    __param(0, common_1.Param('id', new parse_int_pipe_1.ParseIntPipe())), __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, update_day_dto_1.UpdateDayDto]),
    __metadata("design:returntype", Promise)
], DaysController.prototype, "update", null);
__decorate([
    common_1.Delete(':id'),
    __param(0, common_1.Param('id', new parse_int_pipe_1.ParseIntPipe())),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], DaysController.prototype, "delete", null);
DaysController = __decorate([
    common_1.Controller('days'),
    __metadata("design:paramtypes", [days_service_1.DaysService])
], DaysController);
exports.DaysController = DaysController;
//# sourceMappingURL=days.controller.js.map