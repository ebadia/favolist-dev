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
const class_validator_1 = require("class-validator");
class UpdateShopDto {
}
__decorate([
    class_validator_1.IsOptional(), class_validator_1.IsInt(),
    __metadata("design:type", Number)
], UpdateShopDto.prototype, "id", void 0);
__decorate([
    class_validator_1.IsOptional(), class_validator_1.IsString(),
    __metadata("design:type", String)
], UpdateShopDto.prototype, "name", void 0);
__decorate([
    class_validator_1.IsOptional(), class_validator_1.IsString(),
    __metadata("design:type", String)
], UpdateShopDto.prototype, "nif", void 0);
__decorate([
    class_validator_1.IsOptional(), class_validator_1.IsString(),
    __metadata("design:type", String)
], UpdateShopDto.prototype, "address", void 0);
__decorate([
    class_validator_1.IsOptional(), class_validator_1.IsString(),
    __metadata("design:type", String)
], UpdateShopDto.prototype, "cp", void 0);
__decorate([
    class_validator_1.IsOptional(), class_validator_1.IsString(),
    __metadata("design:type", String)
], UpdateShopDto.prototype, "city", void 0);
__decorate([
    class_validator_1.IsOptional(), class_validator_1.IsString(),
    __metadata("design:type", String)
], UpdateShopDto.prototype, "state", void 0);
__decorate([
    class_validator_1.IsOptional(), class_validator_1.IsString(),
    __metadata("design:type", String)
], UpdateShopDto.prototype, "phone", void 0);
__decorate([
    class_validator_1.IsOptional(), class_validator_1.IsString(),
    __metadata("design:type", String)
], UpdateShopDto.prototype, "email", void 0);
__decorate([
    class_validator_1.IsOptional(), class_validator_1.IsString(),
    __metadata("design:type", String)
], UpdateShopDto.prototype, "web", void 0);
__decorate([
    class_validator_1.IsOptional(), class_validator_1.IsString(),
    __metadata("design:type", String)
], UpdateShopDto.prototype, "fb", void 0);
__decorate([
    class_validator_1.IsOptional(),
    __metadata("design:type", Array)
], UpdateShopDto.prototype, "orders", void 0);
__decorate([
    class_validator_1.IsOptional(), class_validator_1.IsArray(),
    __metadata("design:type", Array)
], UpdateShopDto.prototype, "users", void 0);
exports.UpdateShopDto = UpdateShopDto;
//# sourceMappingURL=update-shop.dto.js.map