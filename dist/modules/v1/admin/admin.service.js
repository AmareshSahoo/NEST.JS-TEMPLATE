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
const lodash_1 = __importDefault(require("lodash"));
const bcrypt = __importStar(require("bcryptjs"));
const class_validator_1 = require("class-validator");
const common_1 = require("@nestjs/common");
const sign_in_dto_1 = __importDefault(require("../auth/dto/sign-in.dto"));
const users_repository_1 = __importDefault(require("../users/users.repository"));
let AdminService = class AdminService {
    constructor(usersRepository) {
        this.usersRepository = usersRepository;
    }
    async authAdmin(email, password) {
        const errors = await (0, class_validator_1.validate)(new sign_in_dto_1.default({ email, password }));
        if (!lodash_1.default.isEmpty(errors)) {
            return null;
        }
        const admin = await this.isAdmin(email, password);
        if (admin) {
            return {
                email,
            };
        }
        return null;
    }
    async isAdmin(email, password) {
        const admin = await this.usersRepository.getVerifiedAdminByEmail(email);
        if (admin) {
            return bcrypt.compare(password, admin.password);
        }
        return null;
    }
};
AdminService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [users_repository_1.default])
], AdminService);
exports.default = AdminService;
//# sourceMappingURL=admin.service.js.map