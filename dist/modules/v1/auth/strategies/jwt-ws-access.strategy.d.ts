import { Strategy } from 'passport-jwt';
import { JwtStrategyValidate } from '../interfaces/jwt-strategy-validate.interface';
import { ConfigService } from '@nestjs/config';
declare const JwtWSAccessStrategy_base: new (...args: any[]) => Strategy;
export default class JwtWSAccessStrategy extends JwtWSAccessStrategy_base {
    private readonly configService;
    constructor(configService: ConfigService);
    validate(payload: JwtStrategyValidate): Promise<JwtStrategyValidate>;
}
export {};
