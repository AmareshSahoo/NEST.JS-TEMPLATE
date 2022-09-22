"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const jwt_access_guard_1 = __importDefault(require("../guards/jwt-access.guard"));
const roles_guard_1 = __importDefault(require("../guards/roles.guard"));
function Auth(...roles) {
    return (0, common_1.applyDecorators)((0, common_1.SetMetadata)('roles', roles), (0, common_1.UseGuards)(jwt_access_guard_1.default, roles_guard_1.default));
}
exports.default = Auth;
//# sourceMappingURL=auth.decorator.js.map