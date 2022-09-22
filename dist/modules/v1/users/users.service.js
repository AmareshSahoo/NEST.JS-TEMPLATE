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
const users_repository_1 = __importDefault(require("./users.repository"));
let UsersService = class UsersService {
    constructor(usersRepository) {
        this.usersRepository = usersRepository;
    }
    async create(user) {
        const hashedPassword = await bcrypt.hash(user.password, 10);
        return this.usersRepository.create({
            password: hashedPassword,
            email: user.email,
        });
    }
    getUnverifiedUserByEmail(email) {
        return this.usersRepository.getUnverifiedUserByEmail(email);
    }
    getVerifiedUserByEmail(email) {
        return this.usersRepository.getVerifiedUserByEmail(email);
    }
    getById(id) {
        return this.usersRepository.getById(id);
    }
    getVerifiedUserById(id) {
        return this.usersRepository.getVerifiedUserById(id);
    }
    getUnverifiedUserById(id) {
        return this.usersRepository.getUnverifiedUserById(id);
    }
    update(id, data) {
        return this.usersRepository.updateById(id, data);
    }
    getVerifiedUsers() {
        return this.usersRepository.getVerifiedUsers();
    }
};
UsersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [users_repository_1.default])
], UsersService);
exports.default = UsersService;
//# sourceMappingURL=users.service.js.map