"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt = __importStar(require("bcryptjs"));
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const config_1 = require("@nestjs/config");
const users_repository_1 = __importDefault(require("../users/users.repository"));
const auth_constants_1 = __importDefault(require("./auth-constants"));
const auth_repository_1 = __importDefault(require("./auth.repository"));
let AuthService = class AuthService {
    constructor(jwtService, usersRepository, authRepository, configService) {
        this.jwtService = jwtService;
        this.usersRepository = usersRepository;
        this.authRepository = authRepository;
        this.configService = configService;
    }
    async validateUser(email, password) {
        const user = await this.usersRepository.getVerifiedUserByEmail(email);
        if (!user) {
            throw new common_1.NotFoundException('The item does not exist');
        }
        const passwordCompared = await bcrypt.compare(password, user.password);
        if (passwordCompared) {
            return {
                _id: user._id,
                email: user.email,
                roles: user.roles,
            };
        }
        return null;
    }
    async login(data) {
        const payload = {
            _id: data._id,
            email: data.email,
            roles: data.roles,
        };
        const accessToken = this.jwtService.sign(payload, {
            expiresIn: auth_constants_1.default.jwt.expirationTime.accessToken,
            secret: this.configService.get('ACCESS_TOKEN') || '283f01ccce922bcc2399e7f8ded981285963cec349daba382eb633c1b3a5f282',
        });
        const refreshToken = this.jwtService.sign(payload, {
            expiresIn: auth_constants_1.default.jwt.expirationTime.refreshToken,
            secret: this.configService.get('REFRESH_TOKEN') || 'c15476aec025be7a094f97aac6eba4f69268e706e603f9e1ec4d815396318c86',
        });
        await this.authRepository.addRefreshToken(payload.email, refreshToken);
        return {
            accessToken,
            refreshToken,
        };
    }
    getRefreshTokenByEmail(email) {
        return this.authRepository.getToken(email);
    }
    deleteTokenByEmail(email) {
        return this.authRepository.removeToken(email);
    }
    deleteAllTokens() {
        return this.authRepository.removeAllTokens();
    }
    createVerifyToken(id) {
        return this.jwtService.sign({ id }, {
            expiresIn: auth_constants_1.default.jwt.expirationTime.accessToken,
            secret: this.configService.get('ACCESS_TOKEN') || '283f01ccce922bcc2399e7f8ded981285963cec349daba382eb633c1b3a5f282',
        });
    }
    verifyEmailVerToken(token, secret) {
        return this.jwtService.verifyAsync(token, { secret });
    }
    async verifyToken(token, secret) {
        try {
            const user = (await this.jwtService.verifyAsync(token, {
                secret,
            }));
            return user;
        }
        catch (error) {
            return null;
        }
    }
};
AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [jwt_1.JwtService,
        users_repository_1.default,
        auth_repository_1.default,
        config_1.ConfigService])
], AuthService);
exports.default = AuthService;
//# sourceMappingURL=auth.service.js.map