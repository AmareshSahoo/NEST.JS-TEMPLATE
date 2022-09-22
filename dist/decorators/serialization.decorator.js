"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setSerializeType = exports.getSerializeType = void 0;
const common_1 = require("@nestjs/common");
const serialization_interceptor_1 = __importDefault(require("../interceptors/serialization.interceptor"));
const SERIALIZE_TYPE_KEY = 'SerializeTypeKey';
function getSerializeType(target) {
    return Reflect.getMetadata(SERIALIZE_TYPE_KEY, target);
}
exports.getSerializeType = getSerializeType;
function setSerializeType(target, serializeType) {
    Reflect.defineMetadata(SERIALIZE_TYPE_KEY, serializeType, target);
}
exports.setSerializeType = setSerializeType;
const Serialize = (roles) => (proto, propName, descriptor) => {
    setSerializeType(proto[propName], roles);
    (0, common_1.UseInterceptors)(common_1.ClassSerializerInterceptor)(proto, propName, descriptor);
    (0, common_1.UseInterceptors)(serialization_interceptor_1.default)(proto, propName, descriptor);
};
exports.default = Serialize;
//# sourceMappingURL=serialization.decorator.js.map