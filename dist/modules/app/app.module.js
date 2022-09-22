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
const config_1 = require("@nestjs/config");
const mailer_1 = require("@nestjs-modules/mailer");
const handlebars_adapter_1 = require("@nestjs-modules/mailer/dist/adapters/handlebars.adapter");
const app_controller_1 = __importDefault(require("./app.controller"));
const app_service_1 = __importDefault(require("./app.service"));
const app_gateway_1 = __importDefault(require("./app.gateway"));
const config_2 = __importDefault(require("../../config"));
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                envFilePath: [`${process.cwd()}/.env.${process.env.NODE_ENV}`, '.env'],
                load: [...config_2.default],
                isGlobal: true,
            }),
            mailer_1.MailerModule.forRootAsync({
                useFactory: (cfg) => ({
                    transport: {
                        host: cfg.get('MAILER_HOST'),
                        port: Number(cfg.get('MAILER_PORT')),
                        secure: false,
                        auth: {
                            user: cfg.get('MAILER_USERNAME'),
                            pass: cfg.get('MAILER_PASSWORD'),
                        },
                    },
                    defaults: {
                        from: cfg.get('MAILER_FROM_EMAIL'),
                    },
                    template: {
                        adapter: new handlebars_adapter_1.HandlebarsAdapter(),
                        options: {
                            strict: true,
                        },
                    },
                }),
                inject: [config_1.ConfigService],
            }),
        ],
        controllers: [app_controller_1.default],
        providers: [app_service_1.default, app_gateway_1.default],
    })
], AppModule);
exports.default = AppModule;
//# sourceMappingURL=app.module.js.map