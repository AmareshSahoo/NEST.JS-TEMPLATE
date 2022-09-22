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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const parse_object_id_pipe_1 = __importDefault(require("../../../pipes/parse-object-id.pipe"));
const users_schema_1 = require("./schemas/users.schema");
const users_service_1 = __importDefault(require("./users.service"));
const user_response_dto_1 = __importStar(require("./dto/user-response.dto"));
const serialization_decorator_1 = __importDefault(require("../../../decorators/serialization.decorator"));
const auth_decorator_1 = __importDefault(require("../../../decorators/auth.decorator"));
const wrap_response_interceptor_1 = __importDefault(require("../../../interceptors/wrap-response.interceptor"));
let UsersController = class UsersController {
    constructor(usersService) {
        this.usersService = usersService;
    }
    async getById(id) {
        const foundUser = await this.usersService.getVerifiedUserById(id);
        if (!foundUser) {
            throw new common_1.NotFoundException('The user does not exist');
        }
        return foundUser;
    }
    async getAllVerifiedUsers() {
        const foundUsers = await this.usersService.getVerifiedUsers();
        return foundUsers;
    }
};
__decorate([
    (0, swagger_1.ApiOkResponse)({
        schema: {
            type: 'object',
            properties: {
                data: {
                    $ref: (0, swagger_1.getSchemaPath)(users_schema_1.User),
                },
            },
        },
        description: '200. Success. Returns a user',
    }),
    (0, swagger_1.ApiNotFoundResponse)({
        description: '404. NotFoundException. User was not found',
    }),
    (0, swagger_1.ApiUnauthorizedResponse)({
        schema: {
            type: 'object',
            example: {
                message: 'string',
            },
        },
        description: '401. UnauthorizedException.',
    }),
    (0, swagger_1.ApiParam)({ name: 'id', type: String }),
    (0, common_1.Get)(':id'),
    (0, serialization_decorator_1.default)(user_response_dto_1.UserResponseDto),
    (0, auth_decorator_1.default)(),
    __param(0, (0, common_1.Param)('id', parse_object_id_pipe_1.default)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [mongoose_1.Types.ObjectId]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "getById", null);
__decorate([
    (0, swagger_1.ApiOkResponse)({
        description: '200. Success. Returns all users',
        schema: {
            type: 'object',
            properties: {
                data: {
                    $ref: (0, swagger_1.getSchemaPath)(users_schema_1.User),
                },
            },
        },
    }),
    (0, swagger_1.ApiUnauthorizedResponse)({
        schema: {
            type: 'object',
            example: {
                message: 'string',
            },
        },
        description: '401. UnauthorizedException.',
    }),
    (0, common_1.Get)(),
    (0, serialization_decorator_1.default)(user_response_dto_1.default),
    (0, auth_decorator_1.default)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "getAllVerifiedUsers", null);
UsersController = __decorate([
    (0, swagger_1.ApiTags)('Users'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiExtraModels)(users_schema_1.User),
    (0, common_1.UseInterceptors)(wrap_response_interceptor_1.default),
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [users_service_1.default])
], UsersController);
exports.default = UsersController;
//# sourceMappingURL=users.controller.js.map