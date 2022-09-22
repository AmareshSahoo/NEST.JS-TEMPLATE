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
const common_1 = require("@nestjs/common");
const nestjs_redis_1 = require("@liaoliaots/nestjs-redis");
const auth_constants_1 = __importDefault(require("./auth-constants"));
let AuthRepository = class AuthRepository {
    constructor(redisService) {
        this.redisService = redisService;
        this.redisClient = redisService.getClient();
    }
    async addRefreshToken(userEmail, refreshToken) {
        await this.redisClient.set(userEmail, refreshToken, 'EX', auth_constants_1.default.redis.expirationTime.jwt.refreshToken);
    }
    getToken(key) {
        return this.redisClient.get(key);
    }
    removeToken(key) {
        return this.redisClient.del(key);
    }
    removeAllTokens() {
        return this.redisClient.flushall();
    }
};
AuthRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [nestjs_redis_1.RedisService])
], AuthRepository);
exports.default = AuthRepository;
//# sourceMappingURL=auth.repository.js.map