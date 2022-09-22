"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const AuthBearer = (0, common_1.createParamDecorator)((data, ctx) => {
    const { headers } = ctx.switchToHttp().getRequest();
    return headers.authorization.split(' ')[1];
});
exports.default = AuthBearer;
//# sourceMappingURL=auth-bearer.decorator.js.map