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
class CreateDayDto {
}
__decorate([
    class_validator_1.IsOptional(), class_validator_1.IsInt(),
    __metadata("design:type", Number)
], CreateDayDto.prototype, "id", void 0);
__decorate([
    class_validator_1.IsInt(),
    __metadata("design:type", Number)
], CreateDayDto.prototype, "code", void 0);
__decorate([
    class_validator_1.IsOptional(), class_validator_1.IsString(),
    __metadata("design:type", String)
], CreateDayDto.prototype, "name", void 0);
__decorate([
    class_validator_1.IsOptional(), class_validator_1.IsInt(),
    __metadata("design:type", Number)
], CreateDayDto.prototype, "stock", void 0);
__decorate([
    class_validator_1.IsOptional(), class_validator_1.IsInt(),
    __metadata("design:type", Number)
], CreateDayDto.prototype, "stockOut", void 0);
__decorate([
    class_validator_1.IsOptional(), class_validator_1.IsInt(),
    __metadata("design:type", Number)
], CreateDayDto.prototype, "productId", void 0);
exports.CreateDayDto = CreateDayDto;
//# sourceMappingURL=create-day.dto.js.map