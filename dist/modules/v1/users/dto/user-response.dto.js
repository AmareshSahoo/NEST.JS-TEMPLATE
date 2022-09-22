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
exports.UserResponseDto = void 0;
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const mongodb_1 = require("mongodb");
const roles_decorator_1 = require("../../../../decorators/roles.decorator");
class UserResponseDto {
    constructor() {
        this._id = new mongodb_1.ObjectId();
        this.roles = [roles_decorator_1.RolesEnum.USER];
        this.verified = false;
        this.email = '';
        this.password = '';
    }
}
__decorate([
    (0, class_transformer_1.Transform)(({ value }) => value.toString(), { toPlainOnly: true }),
    __metadata("design:type", mongodb_1.ObjectId)
], UserResponseDto.prototype, "_id", void 0);
__decorate([
    (0, class_transformer_1.Exclude)(),
    __metadata("design:type", String)
], UserResponseDto.prototype, "password", void 0);
exports.UserResponseDto = UserResponseDto;
class UsersResponseDto {
    constructor() {
        this.data = [];
    }
}
__decorate([
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => UserResponseDto),
    __metadata("design:type", Array)
], UsersResponseDto.prototype, "data", void 0);
exports.default = UsersResponseDto;
//# sourceMappingURL=user-response.dto.js.map