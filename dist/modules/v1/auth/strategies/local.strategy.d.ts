import { Strategy } from 'passport-local';
import { Request as ExpressRequest } from 'express';
import { ValidateUserOutput } from '../interfaces/validate-user-output.interface';
import AuthService from '../auth.service';
declare const LocalStrategy_base: new (...args: any[]) => Strategy;
export default class LocalStrategy extends LocalStrategy_base {
    private authService;
    constructor(authService: AuthService);
    validate(req: ExpressRequest, email: string, password: string): Promise<ValidateUserOutput>;
}
export {};
