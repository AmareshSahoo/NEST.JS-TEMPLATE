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
const nestjs_redis_1 = require("@liaoliaots/nestjs-redis");
const config_1 = require("@nestjs/config");
const mongoose_1 = require("@nestjs/mongoose");
const mailer_1 = require("@nestjs-modules/mailer");
const handlebars_adapter_1 = require("@nestjs-modules/mailer/dist/adapters/handlebars.adapter");
const v1_module_1 = __importDefault(require("../v1/v1.module"));
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
            mongoose_1.MongooseModule.forRoot(process.env.MONGODB_URL, {
                autoReconnect: true,
                useCreateIndex: true,
                reconnectTries: Number.MAX_VALUE,
                reconnectInterval: 1000,
                useNewUrlParser: true,
                useUnifiedTopology: true,
            }),
            nestjs_redis_1.RedisModule.forRootAsync({
                useFactory: (cfg) => ({
                    config: {
                        url: cfg.get('REDIS_URL'),
                    },
                }),
                inject: [config_1.ConfigService],
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
            v1_module_1.default,
        ],
        controllers: [app_controller_1.default],
        providers: [app_service_1.default, app_gateway_1.default],
    })
], AppModule);
exports.default = AppModule;
//# sourceMappingURL=app.module.js.map