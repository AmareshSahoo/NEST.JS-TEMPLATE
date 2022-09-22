"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("module-alias/register");
const core_1 = require("@nestjs/core");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const config_1 = require("@nestjs/config");
const app_module_1 = __importDefault(require("./modules/app/app.module"));
const validation_exceptions_1 = __importDefault(require("./exceptions/validation.exceptions"));
const filters_1 = require("./filters");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.default);
    app.useGlobalPipes(new common_1.ValidationPipe({
        exceptionFactory: (errors) => new validation_exceptions_1.default(errors),
    }));
    app.useGlobalFilters(new filters_1.AllExceptionsFilter(), new filters_1.UnauthorizedExceptionFilter(), new filters_1.ForbiddenExceptionFilter(), new filters_1.BadRequestExceptionFilter(), new filters_1.NotFoundExceptionFilter(), new filters_1.ValidationExceptionsFilter());
    const configService = app.get(config_1.ConfigService);
    const port = configService.get('SERVER_PORT') || 3000;
    console.log(`====ENV====`, configService.get('app.port'));
    const options = new swagger_1.DocumentBuilder()
        .setTitle('Api v1')
        .setDescription('The boilerplate API for nestjs devs')
        .setVersion('1.0')
        .addBearerAuth({ in: 'header', type: 'http' })
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, options);
    swagger_1.SwaggerModule.setup('api', app, document);
    await app.listen(port, async () => {
        console.log(`The server is running on ${port} port: http://localhost:${port}/api`);
    });
}
bootstrap();
//# sourceMappingURL=main.js.map