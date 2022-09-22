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
exports.UserSchema = exports.User = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const roles_decorator_1 = require("../../../../decorators/roles.decorator");
let User = class User {
    constructor() {
        this.email = '';
        this.password = '';
        this.verified = false;
        this.roles = [];
    }
};
__decorate([
    (0, mongoose_1.Prop)({
        required: true,
        unique: true,
        type: String,
    }),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        required: true,
        type: String,
    }),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        required: true,
        type: Boolean,
    }),
    __metadata("design:type", Boolean)
], User.prototype, "verified", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: [String],
        required: false,
        default: [roles_decorator_1.RolesEnum.USER],
    }),
    __metadata("design:type", Array)
], User.prototype, "roles", void 0);
User = __decorate([
    (0, mongoose_1.Schema)()
], User);
exports.User = User;
exports.UserSchema = mongoose_1.SchemaFactory.createForClass(User).set('versionKey', false);
//# sourceMappingURL=users.schema.js.map