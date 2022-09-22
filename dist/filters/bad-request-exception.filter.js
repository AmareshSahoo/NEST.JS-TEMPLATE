"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BadRequestExceptionFilter = void 0;
const common_1 = require("@nestjs/common");
let BadRequestExceptionFilter = class BadRequestExceptionFilter {
    catch(exception, host) {
        const ctx = host.switchToHttp();
        const res = ctx.getResponse();
        const exceptionResponse = exception.getResponse();
        const errorBody = {
            error: exception.name,
        };
        if (Array.isArray(exceptionResponse.message)) {
            Reflect.set(errorBody, 'messages', exceptionResponse.message);
        }
        else {
            Reflect.set(errorBody, 'message', exceptionResponse.message);
        }
        return res.status(common_1.HttpStatus.BAD_REQUEST).json(errorBody);
    }
};
BadRequestExceptionFilter = __decorate([
    (0, common_1.Catch)(common_1.BadRequestException)
], BadRequestExceptionFilter);
exports.BadRequestExceptionFilter = BadRequestExceptionFilter;
//# sourceMappingURL=bad-request-exception.filter.js.map