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
const Item_entity_1 = require("../../entities/Item.entity");
let ItemsService = class ItemsService {
    constructor(itemsRepo) {
        this.itemsRepo = itemsRepo;
    }
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.itemsRepo
                .createQueryBuilder('item')
                .leftJoinAndSelect('item.product', 'product')
                .getMany();
        });
    }
    find(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.itemsRepo
                .createQueryBuilder('item')
                .leftJoinAndSelect('item.product', 'product')
                .where('item.id = :id', { id })
                .getOne();
        });
    }
    create(item) {
        return __awaiter(this, void 0, void 0, function* () {
            const anItem = Object.assign(new Item_entity_1.Item(), item);
            return yield this.itemsRepo.save(anItem);
        });
    }
    update(id, item) {
        return __awaiter(this, void 0, void 0, function* () {
            const anItem = Object.assign(new Item_entity_1.Item(), item);
            yield this.itemsRepo.updateById(id, anItem);
            const upatedItem = yield this.itemsRepo.findOneById(id);
            this.server.emit('item updated', {
                event: 'item updated',
                data: upatedItem
            });
            return upatedItem;
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.itemsRepo.removeById(id);
        });
    }
    onItemReady(client, data) {
        const event = 'item ready';
        console.log('---------------------------- HA LLEGADO UN MENSAJE PARA TI DE ITEM READY');
        return { event, data };
    }
};
__decorate([
    websockets_1.WebSocketServer(),
    __metadata("design:type", Object)
], ItemsService.prototype, "server", void 0);
__decorate([
    websockets_1.SubscribeMessage('item ready'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Object)
], ItemsService.prototype, "onItemReady", null);
ItemsService = __decorate([
    common_1.Component(),
    websockets_1.WebSocketGateway(),
    __param(0, typeorm_1.InjectRepository(Item_entity_1.Item)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], ItemsService);
exports.ItemsService = ItemsService;
//# sourceMappingURL=items.service.js.map