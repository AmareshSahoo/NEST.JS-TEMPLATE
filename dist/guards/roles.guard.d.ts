import { CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
export default class RolesGuard implements CanActivate {
    private reflector;
    constructor(reflector: Reflector);
    canActivate(context: ExecutionContext): Promise<boolean>;
}
