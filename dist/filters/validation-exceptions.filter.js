"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidationExceptionsFilter = void 0;
const common_1 = require("@nestjs/common");
const validation_exceptions_1 = __importDefault(require("../exceptions/validation.exceptions"));
let ValidationExceptionsFilter = class ValidationExceptionsFilter {
    catch(exception, host) {
        const ctx = host.switchToHttp();
        const res = ctx.getResponse();
        const exceptionResponse = exception.getResponse();
        return res.status(common_1.HttpStatus.BAD_REQUEST).json({
            error: exception.name,
            messages: exceptionResponse.messages,
        });
    }
};
ValidationExceptionsFilter = __decorate([
    (0, common_1.Catch)(validation_exceptions_1.default)
], ValidationExceptionsFilter);
exports.ValidationExceptionsFilter = ValidationExceptionsFilter;
//# sourceMappingURL=validation-exceptions.filter.js.map