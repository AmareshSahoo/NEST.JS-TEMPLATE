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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const jwt_1 = require("@nestjs/jwt");
const mailer_1 = require("@nestjs-modules/mailer");
const config_1 = require("@nestjs/config");
const users_service_1 = __importDefault(require("../users/users.service"));
const users_schema_1 = require("../users/schemas/users.schema");
const wrap_response_interceptor_1 = __importDefault(require("../../../interceptors/wrap-response.interceptor"));
const auth_bearer_decorator_1 = __importDefault(require("../../../decorators/auth-bearer.decorator"));
const roles_decorator_1 = require("../../../decorators/roles.decorator");
const auth_decorator_1 = __importDefault(require("../../../decorators/auth.decorator"));
const auth_constants_1 = __importDefault(require("./auth-constants"));
const local_auth_guard_1 = __importDefault(require("./guards/local-auth.guard"));
const auth_service_1 = __importDefault(require("./auth.service"));
const refresh_token_dto_1 = __importDefault(require("./dto/refresh-token.dto"));
const sign_in_dto_1 = __importDefault(require("./dto/sign-in.dto"));
const sign_up_dto_1 = __importDefault(require("./dto/sign-up.dto"));
const jwt_tokens_dto_1 = __importDefault(require("./dto/jwt-tokens.dto"));
let AuthController = class AuthController {
    constructor(authService, jwtService, usersService, mailerService, configService) {
        this.authService = authService;
        this.jwtService = jwtService;
        this.usersService = usersService;
        this.mailerService = mailerService;
        this.configService = configService;
    }
    async signIn(req) {
        const user = req.user;
        return this.authService.login(user);
    }
    async signUp(user) {
        const { _id, email } = await this.usersService.create(user);
        const token = this.authService.createVerifyToken(_id);
        await this.mailerService.sendMail({
            to: email,
            from: this.configService.get('MAILER_FROM_EMAIL'),
            subject: auth_constants_1.default.mailer.verifyEmail.subject,
            template: `${process.cwd()}/src/templates/verify-password`,
            context: {
                token,
                email,
                host: this.configService.get('SERVER_HOST'),
            },
        });
        return { message: 'Success! please verify your email' };
    }
    async refreshToken(refreshTokenDto) {
        const decodedUser = this.jwtService.decode(refreshTokenDto.refreshToken);
        if (!decodedUser) {
            throw new common_1.ForbiddenException('Incorrect token');
        }
        const oldRefreshToken = await this.authService.getRefreshTokenByEmail(decodedUser.email);
        if (!oldRefreshToken || oldRefreshToken !== refreshTokenDto.refreshToken) {
            throw new common_1.UnauthorizedException('Authentication credentials were missing or incorrect');
        }
        const payload = {
            _id: decodedUser._id,
            email: decodedUser.email,
            roles: decodedUser.roles,
        };
        return this.authService.login(payload);
    }
    async verifyUser(token) {
        const { id } = await this.authService.verifyEmailVerToken(token, this.configService.get('ACCESS_TOKEN') || '283f01ccce922bcc2399e7f8ded981285963cec349daba382eb633c1b3a5f282');
        const foundUser = await this.usersService.getUnverifiedUserById(id);
        if (!foundUser) {
            throw new common_1.NotFoundException('The user does not exist');
        }
        return this.usersService.update(foundUser._id, { verified: true });
    }
    async logout(token) {
        const decodedUser = await this.authService.verifyToken(token, this.configService.get('ACCESS_TOKEN') || '283f01ccce922bcc2399e7f8ded981285963cec349daba382eb633c1b3a5f282');
        if (!decodedUser) {
            throw new common_1.ForbiddenException('Incorrect token');
        }
        const deletedUsersCount = await this.authService.deleteTokenByEmail(decodedUser.email);
        if (deletedUsersCount === 0) {
            throw new common_1.NotFoundException();
        }
        return {};
    }
    async logoutAll() {
        return this.authService.deleteAllTokens();
    }
    async getUserByAccessToken(token) {
        const decodedUser = await this.authService.verifyToken(token, this.configService.get('ACCESS_TOKEN') || '283f01ccce922bcc2399e7f8ded981285963cec349daba382eb633c1b3a5f282');
        if (!decodedUser) {
            throw new common_1.ForbiddenException('Incorrect token');
        }
        const { exp, iat } = decodedUser, user = __rest(decodedUser, ["exp", "iat"]);
        return user;
    }
};
__decorate([
    (0, swagger_1.ApiBody)({ type: sign_in_dto_1.default }),
    (0, swagger_1.ApiOkResponse)({
        schema: {
            type: 'object',
            properties: {
                data: {
                    $ref: (0, swagger_1.getSchemaPath)(jwt_tokens_dto_1.default),
                },
            },
        },
        description: 'Returns jwt tokens',
    }),
    (0, swagger_1.ApiBadRequestResponse)({
        schema: {
            type: 'object',
            example: {
                message: [
                    {
                        target: {
                            email: 'string',
                            password: 'string',
                        },
                        value: 'string',
                        property: 'string',
                        children: [],
                        constraints: {},
                    },
                ],
                error: 'Bad Request',
            },
        },
        description: '400. ValidationException',
    }),
    (0, swagger_1.ApiInternalServerErrorResponse)({
        schema: {
            type: 'object',
            example: {
                message: 'string',
                details: {},
            },
        },
        description: '500. InternalServerError',
    }),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, common_1.UseGuards)(local_auth_guard_1.default),
    (0, common_1.Post)('sign-in'),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "signIn", null);
__decorate([
    (0, swagger_1.ApiBody)({ type: sign_up_dto_1.default }),
    (0, swagger_1.ApiOkResponse)({
        description: '201, Success',
    }),
    (0, swagger_1.ApiBadRequestResponse)({
        schema: {
            type: 'object',
            example: {
                message: [
                    {
                        target: {
                            email: 'string',
                            password: 'string',
                        },
                        value: 'string',
                        property: 'string',
                        children: [],
                        constraints: {},
                    },
                ],
                error: 'Bad Request',
            },
        },
        description: '400. ValidationException',
    }),
    (0, swagger_1.ApiConflictResponse)({
        schema: {
            type: 'object',
            example: {
                message: 'string',
            },
        },
        description: '409. ConflictResponse',
    }),
    (0, swagger_1.ApiInternalServerErrorResponse)({
        schema: {
            type: 'object',
            example: {
                message: 'string',
                details: {},
            },
        },
        description: '500. InternalServerError',
    }),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    (0, common_1.Post)('sign-up'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [sign_up_dto_1.default]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "signUp", null);
__decorate([
    (0, swagger_1.ApiOkResponse)({
        schema: {
            type: 'object',
            properties: {
                data: {
                    $ref: (0, swagger_1.getSchemaPath)(jwt_tokens_dto_1.default),
                },
            },
        },
        description: '200, returns new jwt tokens',
    }),
    (0, swagger_1.ApiUnauthorizedResponse)({
        schema: {
            type: 'object',
            example: {
                message: 'string',
            },
        },
        description: '401. Token has been expired',
    }),
    (0, swagger_1.ApiInternalServerErrorResponse)({
        schema: {
            type: 'object',
            example: {
                message: 'string',
                details: {},
            },
        },
        description: '500. InternalServerError ',
    }),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Post)('refresh-token'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [refresh_token_dto_1.default]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "refreshToken", null);
__decorate([
    (0, swagger_1.ApiNoContentResponse)({
        description: 'No content. 204',
    }),
    (0, swagger_1.ApiNotFoundResponse)({
        schema: {
            type: 'object',
            example: {
                message: 'string',
                error: 'Not Found',
            },
        },
        description: 'User was not found',
    }),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    (0, common_1.Get)('verify/:token'),
    __param(0, (0, common_1.Param)('token')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "verifyUser", null);
__decorate([
    (0, swagger_1.ApiNoContentResponse)({
        description: 'no content',
    }),
    (0, swagger_1.ApiUnauthorizedResponse)({
        schema: {
            type: 'object',
            example: {
                message: 'string',
            },
        },
        description: 'Token has been expired',
    }),
    (0, swagger_1.ApiInternalServerErrorResponse)({
        schema: {
            type: 'object',
            example: {
                message: 'string',
                details: {},
            },
        },
        description: 'InternalServerError',
    }),
    (0, swagger_1.ApiBearerAuth)(),
    (0, auth_decorator_1.default)(),
    (0, common_1.Delete)('logout/:token'),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    __param(0, (0, common_1.Param)('token')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "logout", null);
__decorate([
    (0, swagger_1.ApiNoContentResponse)({
        description: 'no content',
    }),
    (0, swagger_1.ApiInternalServerErrorResponse)({
        schema: {
            type: 'object',
            example: {
                message: 'string',
                details: {},
            },
        },
        description: '500. InternalServerError',
    }),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Delete)('logout-all'),
    (0, auth_decorator_1.default)(roles_decorator_1.RolesEnum.ADMIN),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "logoutAll", null);
__decorate([
    (0, swagger_1.ApiOkResponse)({
        type: users_schema_1.User,
        description: '200, returns a decoded user from access token',
    }),
    (0, swagger_1.ApiUnauthorizedResponse)({
        schema: {
            type: 'object',
            example: {
                message: 'string',
            },
        },
        description: '403, says you Unauthorized',
    }),
    (0, swagger_1.ApiInternalServerErrorResponse)({
        schema: {
            type: 'object',
            example: {
                message: 'string',
                details: {},
            },
        },
        description: '500. InternalServerError',
    }),
    (0, swagger_1.ApiBearerAuth)(),
    (0, auth_decorator_1.default)(),
    (0, common_1.Get)('token'),
    __param(0, (0, auth_bearer_decorator_1.default)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "getUserByAccessToken", null);
AuthController = __decorate([
    (0, swagger_1.ApiTags)('Auth'),
    (0, common_1.UseInterceptors)(wrap_response_interceptor_1.default),
    (0, swagger_1.ApiExtraModels)(jwt_tokens_dto_1.default),
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [auth_service_1.default,
        jwt_1.JwtService,
        users_service_1.default,
        mailer_1.MailerService,
        config_1.ConfigService])
], AuthController);
exports.default = AuthController;
//# sourceMappingURL=auth.controller.js.map