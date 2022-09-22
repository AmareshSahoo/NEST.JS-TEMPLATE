import { JwtService } from '@nestjs/jwt';
import { Types } from 'mongoose';
import { ConfigService } from '@nestjs/config';
import UsersRepository from '@v1/users/users.repository';
import { UserInterface } from '@v1/users/interfaces/user.interface';
import { DecodedUser } from './interfaces/decoded-user.interface';
import JwtTokensDto from './dto/jwt-tokens.dto';
import { LoginPayload } from './interfaces/login-payload.interface';
import AuthRepository from './auth.repository';
export default class AuthService {
    private readonly jwtService;
    private readonly usersRepository;
    private readonly authRepository;
    private readonly configService;
    constructor(jwtService: JwtService, usersRepository: UsersRepository, authRepository: AuthRepository, configService: ConfigService);
    validateUser(email: string, password: string): Promise<null | UserInterface>;
    login(data: LoginPayload): Promise<JwtTokensDto>;
    getRefreshTokenByEmail(email: string): Promise<string | null>;
    deleteTokenByEmail(email: string): Promise<number>;
    deleteAllTokens(): Promise<string>;
    createVerifyToken(id: Types.ObjectId): string;
    verifyEmailVerToken(token: string, secret: string): Promise<any>;
    verifyToken(token: string, secret: string): Promise<DecodedUser | null>;
}
