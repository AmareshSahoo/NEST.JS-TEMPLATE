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
const admin_service_1 = __importDefault(require("./admin.service"));
const users_module_1 = __importDefault(require("../users/users.module"));
let AdminModule = class AdminModule {
};
AdminModule = __decorate([
    (0, common_1.Module)({
        imports: [users_module_1.default],
        providers: [admin_service_1.default],
        exports: [admin_service_1.default],
    })
], AdminModule);
exports.default = AdminModule;
//# sourceMappingURL=admin.module.js.map