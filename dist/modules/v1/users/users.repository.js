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
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const mongoose_2 = require("@nestjs/mongoose");
const common_1 = require("@nestjs/common");
const roles_decorator_1 = require("../../../decorators/roles.decorator");
const users_schema_1 = require("./schemas/users.schema");
let UsersRepository = class UsersRepository {
    constructor(usersModel) {
        this.usersModel = usersModel;
    }
    async create(user) {
        const newUser = await this.usersModel.create(Object.assign(Object.assign({}, user), { verified: false }));
        return newUser.toJSON();
    }
    async getUnverifiedUserByEmail(email) {
        return this.usersModel.findOne({
            email,
            verified: false,
        }).exec();
    }
    async getVerifiedUserByEmail(email) {
        return this.usersModel.findOne({
            email,
            verified: true,
        }).exec();
    }
    async getById(id) {
        return this.usersModel.findOne({
            _id: id,
        }, { password: 0 }).exec();
    }
    async getVerifiedUserById(id) {
        return this.usersModel.findOne({
            _id: id,
            verified: true,
        }, { password: 0 }).exec();
    }
    async getUnverifiedUserById(id) {
        return this.usersModel.findOne({
            _id: id,
            verified: false,
        }, { password: 0 }).exec();
    }
    async updateById(id, data) {
        return this.usersModel.findByIdAndUpdate(id, {
            $set: data,
        }).exec();
    }
    getAll() {
        return this.usersModel.find().exec();
    }
    getVerifiedUsers() {
        return this.usersModel.find({ verified: true }).exec();
    }
    async getVerifiedAdminByEmail(email) {
        return this.usersModel.findOne({
            email,
            roles: { $in: roles_decorator_1.RolesEnum.ADMIN },
            verified: true,
        }).exec();
    }
};
UsersRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_2.InjectModel)(users_schema_1.User.name)),
    __metadata("design:paramtypes", [mongoose_1.Model])
], UsersRepository);
exports.default = UsersRepository;
//# sourceMappingURL=users.repository.js.map