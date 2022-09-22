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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const sign_in_dto_1 = __importDefault(require("../../auth/dto/sign-in.dto"));
const roles_decorator_1 = require("../../../../decorators/roles.decorator");
class CreateUserDto extends sign_in_dto_1.default {
    constructor({ email, password, roles, verified, }) {
        super({ email, password });
        this.verified = false;
        this.roles = roles;
        this.verified = verified;
    }
}
__decorate([
    (0, swagger_1.ApiProperty)({ type: [roles_decorator_1.RolesEnum], default: [roles_decorator_1.RolesEnum.USER] }),
    (0, class_validator_1.ArrayUnique)(),
    (0, class_validator_1.ArrayNotEmpty)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsEnum)(roles_decorator_1.RolesEnum, { each: true }),
    __metadata("design:type", Array)
], CreateUserDto.prototype, "roles", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: Boolean, default: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], CreateUserDto.prototype, "verified", void 0);
exports.default = CreateUserDto;
//# sourceMappingURL=create-user.dto.js.map