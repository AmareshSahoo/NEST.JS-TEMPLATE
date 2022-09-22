import { JwtService } from '@nestjs/jwt';
import { Request as ExpressRequest } from 'express';
import { MailerService } from '@nestjs-modules/mailer';
import { ConfigService } from '@nestjs/config';
import UsersService from '@v1/users/users.service';
import { User } from '@v1/users/schemas/users.schema';
import { DecodedUser } from './interfaces/decoded-user.interface';
import AuthService from './auth.service';
import RefreshTokenDto from './dto/refresh-token.dto';
import SignUpDto from './dto/sign-up.dto';
import JwtTokensDto from './dto/jwt-tokens.dto';
export default class AuthController {
    private readonly authService;
    private readonly jwtService;
    private readonly usersService;
    private readonly mailerService;
    private readonly configService;
    constructor(authService: AuthService, jwtService: JwtService, usersService: UsersService, mailerService: MailerService, configService: ConfigService);
    signIn(req: ExpressRequest): Promise<JwtTokensDto>;
    signUp(user: SignUpDto): Promise<any>;
    refreshToken(refreshTokenDto: RefreshTokenDto): Promise<JwtTokensDto | never>;
    verifyUser(token: string): Promise<User | null>;
    logout(token: string): Promise<{} | never>;
    logoutAll(): Promise<{}>;
    getUserByAccessToken(token: string): Promise<DecodedUser | never>;
}
