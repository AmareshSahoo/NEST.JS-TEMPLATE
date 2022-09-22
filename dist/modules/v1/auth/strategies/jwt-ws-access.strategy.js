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
const passport_jwt_1 = require("passport-jwt");
const passport_1 = require("@nestjs/passport");
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
let JwtWSAccessStrategy = class JwtWSAccessStrategy extends (0, passport_1.PassportStrategy)(passport_jwt_1.Strategy, 'accessTokenWS') {
    constructor(configService) {
        super({
            jwtFromRequest: passport_jwt_1.ExtractJwt.fromExtractors([
                (client) => {
                    var _a, _b;
                    const bearerToken = (_b = (_a = client === null || client === void 0 ? void 0 : client.handshake) === null || _a === void 0 ? void 0 : _a.headers) === null || _b === void 0 ? void 0 : _b.authorization;
                    return bearerToken ? bearerToken.split(' ')[1] : null;
                },
            ]),
            ignoreExpiration: false,
            secretOrKey: configService.get('ACCESS_TOKEN') || '283f01ccce922bcc2399e7f8ded981285963cec349daba382eb633c1b3a5f282',
        });
        this.configService = configService;
    }
    async validate(payload) {
        return {
            _id: payload._id,
            email: payload.email,
            roles: payload.roles,
        };
    }
};
JwtWSAccessStrategy = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], JwtWSAccessStrategy);
exports.default = JwtWSAccessStrategy;
//# sourceMappingURL=jwt-ws-access.strategy.js.map