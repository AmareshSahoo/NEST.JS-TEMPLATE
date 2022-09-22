import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
export default class SerializeInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any>;
}
