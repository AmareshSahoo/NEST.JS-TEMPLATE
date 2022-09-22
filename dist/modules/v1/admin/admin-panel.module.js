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
const adminjs_1 = __importDefault(require("adminjs"));
const nestjs_1 = require("@adminjs/nestjs");
const mongoose_1 = __importDefault(require("@adminjs/mongoose"));
const mongoose_2 = require("@nestjs/mongoose");
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const users_module_1 = __importDefault(require("../users/users.module"));
const admin_service_1 = __importDefault(require("./admin.service"));
const admin_module_1 = __importDefault(require("./admin.module"));
const user_resource_1 = __importDefault(require("./resources/user.resource"));
adminjs_1.default.registerAdapter(mongoose_1.default);
let AdminPanelModule = class AdminPanelModule {
};
AdminPanelModule = __decorate([
    (0, common_1.Module)({
        imports: [
            nestjs_1.AdminModule.createAdminAsync({
                imports: [
                    users_module_1.default,
                    admin_module_1.default,
                ],
                inject: [
                    config_1.ConfigService,
                    admin_service_1.default,
                    (0, mongoose_2.getModelToken)('User'),
                ],
                useFactory: (cfg, adminService, userModel) => ({
                    adminJsOptions: {
                        rootPath: '/admin',
                        resources: [(0, user_resource_1.default)(userModel)],
                    },
                    auth: {
                        authenticate: adminService.authAdmin.bind(adminService),
                        cookieName: cfg.get('ADMIN_COOKIE_NAME'),
                        cookiePassword: cfg.get('ADMIN_COOKIE_PASSWORD'),
                    },
                }),
            }),
            users_module_1.default,
            admin_module_1.default,
        ],
    })
], AdminPanelModule);
exports.default = AdminPanelModule;
//# sourceMappingURL=admin-panel.module.js.map