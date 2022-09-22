import { Response as ExpressResponse } from 'express';
import { ArgumentsHost, ExceptionFilter } from '@nestjs/common';
export declare class BadRequestExceptionFilter implements ExceptionFilter {
    catch(exception: any, host: ArgumentsHost): ExpressResponse<any, Record<string, any>>;
}
