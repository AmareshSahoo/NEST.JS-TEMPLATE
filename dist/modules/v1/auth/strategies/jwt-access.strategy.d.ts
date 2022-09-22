import { Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { UserDocument } from '@v1/users/schemas/users.schema';
import { JwtStrategyValidate } from '../interfaces/jwt-strategy-validate.interface';
declare const JwtAccessStrategy_base: new (...args: any[]) => Strategy;
export default class JwtAccessStrategy extends JwtAccessStrategy_base {
    private readonly configService;
    constructor(configService: ConfigService);
    validate(payload: UserDocument): Promise<JwtStrategyValidate>;
}
export {};
