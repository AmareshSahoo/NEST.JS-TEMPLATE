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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ws_exceptions_filter_1 = __importDefault(require("../../filters/ws-exceptions.filter"));
const jwt_ws_access_guard_1 = __importDefault(require("../../guards/jwt-ws-access.guard"));
const common_1 = require("@nestjs/common");
const websockets_1 = require("@nestjs/websockets");
let AppGateway = class AppGateway {
    handleEvent() {
        return 'Hello, World!';
    }
};
__decorate([
    (0, common_1.UseGuards)(jwt_ws_access_guard_1.default),
    (0, websockets_1.SubscribeMessage)('event'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AppGateway.prototype, "handleEvent", null);
AppGateway = __decorate([
    (0, common_1.UseFilters)(ws_exceptions_filter_1.default),
    (0, websockets_1.WebSocketGateway)(3001)
], AppGateway);
exports.default = AppGateway;
//# sourceMappingURL=app.gateway.js.map