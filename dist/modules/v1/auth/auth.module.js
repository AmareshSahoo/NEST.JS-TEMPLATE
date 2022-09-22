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
const passport_1 = require("@nestjs/passport");
const jwt_1 = require("@nestjs/jwt");
const users_module_1 = __importDefault(require("../users/users.module"));
const auth_repository_1 = __importDefault(require("./auth.repository"));
const local_strategy_1 = __importDefault(require("./strategies/local.strategy"));
const jwt_access_strategy_1 = __importDefault(require("./strategies/jwt-access.strategy"));
const jwt_refresh_strategy_1 = __importDefault(require("./strategies/jwt-refresh.strategy"));
const jwt_ws_access_strategy_1 = __importDefault(require("./strategies/jwt-ws-access.strategy"));
const auth_constants_1 = __importDefault(require("./auth-constants"));
const auth_controller_1 = __importDefault(require("./auth.controller"));
const auth_service_1 = __importDefault(require("./auth.service"));
let AuthModule = class AuthModule {
};
AuthModule = __decorate([
    (0, common_1.Module)({
        imports: [
            users_module_1.default,
            passport_1.PassportModule,
            jwt_1.JwtModule.register({
                secret: auth_constants_1.default.jwt.secret,
            }),
        ],
        providers: [
            auth_service_1.default,
            local_strategy_1.default,
            jwt_access_strategy_1.default,
            jwt_refresh_strategy_1.default,
            auth_repository_1.default,
            jwt_ws_access_strategy_1.default,
        ],
        controllers: [auth_controller_1.default],
        exports: [auth_service_1.default],
    })
], AuthModule);
exports.default = AuthModule;
//# sourceMappingURL=auth.module.js.map