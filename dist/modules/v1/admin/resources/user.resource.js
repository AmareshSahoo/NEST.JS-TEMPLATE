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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = __importDefault(require("lodash"));
const bcrypt = __importStar(require("bcryptjs"));
const adminjs_1 = require("adminjs");
const class_validator_1 = require("class-validator");
const passwords_1 = __importDefault(require("@adminjs/passwords"));
const create_user_dto_1 = __importDefault(require("../dto/create-user.dto"));
const admim_validation_exception_1 = __importDefault(require("../../../../exceptions/admim-validation.exception"));
const roles_decorator_1 = require("../../../../decorators/roles.decorator");
const beforeCreateUser = async (request) => {
    const payload = new create_user_dto_1.default(adminjs_1.flat.unflatten(request.payload));
    if (!payload.verified) {
        Reflect.set(payload, 'verified', false);
    }
    const errors = await (0, class_validator_1.validate)(payload);
    if (!lodash_1.default.isEmpty(errors)) {
        throw new admim_validation_exception_1.default(errors);
    }
    Reflect.set(request, 'payload', adminjs_1.flat.flatten(payload));
    return request;
};
exports.default = (userModel) => ({
    resource: userModel,
    options: {
        properties: {
            password: {
                isVisible: false,
            },
            setPassword: {
                isVisible: {
                    list: false,
                    edit: true,
                    filter: false,
                    show: false,
                },
            },
            verified: {
                isRequired: false,
            },
            roles: {
                availableValues: Object.values(roles_decorator_1.RolesEnum).map((role) => ({
                    label: role,
                    value: role,
                })),
            },
        },
        actions: {
            new: {
                before: beforeCreateUser,
            },
            edit: {
                before: beforeCreateUser,
            },
        },
    },
    features: [(0, passwords_1.default)({
            properties: {
                password: 'setPassword',
                encryptedPassword: 'password',
            },
            hash: (password) => bcrypt.hash(password, 10),
        })],
});
//# sourceMappingURL=user.resource.js.map