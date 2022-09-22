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
const app_service_1 = __importDefault(require("./app.service"));
const swagger_1 = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
let AppController = class AppController {
    constructor(appService) {
        this.appService = appService;
    }
    sayHello() {
        return this.appService.getHello();
    }
};
__decorate([
    (0, swagger_1.ApiOkResponse)({ description: 'Returns you Hello world!' }),
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", String)
], AppController.prototype, "sayHello", null);
AppController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [app_service_1.default])
], AppController);
exports.default = AppController;
//# sourceMappingURL=app.controller.js.map