import { ArgumentsHost } from '@nestjs/common';
import { BaseWsExceptionFilter } from '@nestjs/websockets';
export default class WsExceptionsFilter extends BaseWsExceptionFilter {
    catch(exception: any, host: ArgumentsHost): void;
}
