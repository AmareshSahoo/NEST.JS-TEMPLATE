"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AllExceptionsFilter = void 0;
const common_1 = require("@nestjs/common");
let AllExceptionsFilter = class AllExceptionsFilter {
    catch(exception, host) {
        const ctx = host.switchToHttp();
        const res = ctx.getResponse();
        const exceptionResponse = exception.getResponse
            ? exception.getResponse()
            : null;
        const status = exception.getStatus ? exception.getStatus() : 500;
        const mongodbCodes = {
            bulkWriteError: 11000,
        };
        if (exception.code === mongodbCodes.bulkWriteError) {
            return res.status(common_1.HttpStatus.CONFLICT).json({
                error: 'Duplicate key',
                message: exception.message,
            });
        }
        const errorBody = {
            error: exception.name,
            message: exception.message,
        };
        if (exceptionResponse) {
            if (Array.isArray(exceptionResponse.message)) {
                Reflect.set(errorBody, 'messages', exceptionResponse.message);
            }
            else {
                Reflect.set(errorBody, 'message', exceptionResponse.message);
            }
        }
        return res.status(status).json(errorBody);
    }
};
AllExceptionsFilter = __decorate([
    (0, common_1.Catch)()
], AllExceptionsFilter);
exports.AllExceptionsFilter = AllExceptionsFilter;
//# sourceMappingURL=all-exceptions.filter.js.map