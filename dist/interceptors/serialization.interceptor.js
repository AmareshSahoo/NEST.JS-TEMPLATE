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
const common_1 = require("@nestjs/common");
const operators_1 = require("rxjs/operators");
const lodash_1 = __importDefault(require("lodash"));
const serialization_decorator_1 = require("../decorators/serialization.decorator");
const getSerializer = (entity) => (data) => Object.assign(entity, data);
let SerializeInterceptor = class SerializeInterceptor {
    intercept(context, next) {
        return next.handle().pipe((0, operators_1.map)((args) => {
            const SerializeType = (0, serialization_decorator_1.getSerializeType)(context.getHandler());
            const serializer = getSerializer(new SerializeType());
            if (lodash_1.default.isArray(args)) {
                if (args && args[0] && args[0].toJSON) {
                    return serializer({ data: args.map((doc) => doc.toJSON()) });
                }
                return serializer({ data: args });
            }
            if (args && args.toJSON) {
                return serializer(args.toJSON());
            }
            return serializer(args);
        }));
    }
};
SerializeInterceptor = __decorate([
    (0, common_1.Injectable)()
], SerializeInterceptor);
exports.default = SerializeInterceptor;
//# sourceMappingURL=serialization.interceptor.js.map