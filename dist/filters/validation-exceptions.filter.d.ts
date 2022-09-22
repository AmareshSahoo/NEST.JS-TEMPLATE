import { Response as ExpressResponse } from 'express';
import { ArgumentsHost, ExceptionFilter } from '@nestjs/common';
export declare class ValidationExceptionsFilter implements ExceptionFilter {
    catch(exception: any, host: ArgumentsHost): ExpressResponse<any, Record<string, any>>;
}
