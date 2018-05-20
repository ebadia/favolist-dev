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
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const websockets_1 = require("@nestjs/websockets");
const Day_entity_1 = require("../../entities/Day.entity");
let DaysService = class DaysService {
    constructor(repo) {
        this.repo = repo;
    }
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.repo
                .createQueryBuilder('day')
                .leftJoinAndSelect('day.product', 'product')
                .getMany();
        });
    }
    find(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.repo
                .createQueryBuilder('day')
                .leftJoinAndSelect('day.product', 'product')
                .where('day.id = :id', { id })
                .getOne();
        });
    }
    create(day) {
        return __awaiter(this, void 0, void 0, function* () {
            const anDay = Object.assign(new Day_entity_1.Day(), day);
            return yield this.repo.save(anDay);
        });
    }
    update(id, day) {
        return __awaiter(this, void 0, void 0, function* () {
            const anDay = Object.assign(new Day_entity_1.Day(), day);
            yield this.repo.updateById(id, anDay);
            const upatedDay = yield this.repo.findOneById(id);
            return upatedDay;
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const item = yield this.repo.findOneById(id);
            yield this.repo.remove(item);
        });
    }
};
__decorate([
    websockets_1.WebSocketServer(),
    __metadata("design:type", Object)
], DaysService.prototype, "server", void 0);
DaysService = __decorate([
    common_1.Component(),
    websockets_1.WebSocketGateway(),
    __param(0, typeorm_1.InjectRepository(Day_entity_1.Day)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], DaysService);
exports.DaysService = DaysService;
//# sourceMappingURL=days.service.js.map