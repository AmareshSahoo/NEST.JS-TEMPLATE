"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const users_schema_1 = require("./schemas/users.schema");
const users_controller_1 = __importDefault(require("./users.controller"));
const users_service_1 = __importDefault(require("./users.service"));
const users_repository_1 = __importDefault(require("./users.repository"));
let UsersModule = class UsersModule {
};
UsersModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([{
                    name: users_schema_1.User.name,
                    schema: users_schema_1.UserSchema,
                }]),
        ],
        controllers: [users_controller_1.default],
        providers: [users_service_1.default, users_repository_1.default],
        exports: [users_service_1.default, users_repository_1.default, mongoose_1.MongooseModule],
    })
], UsersModule);
exports.default = UsersModule;
//# sourceMappingURL=users.module.js.map