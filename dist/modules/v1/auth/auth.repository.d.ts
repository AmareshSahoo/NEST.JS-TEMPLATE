import { RedisService } from '@liaoliaots/nestjs-redis';
export default class AuthRepository {
    private readonly redisService;
    private readonly redisClient;
    constructor(redisService: RedisService);
    addRefreshToken(userEmail: string, refreshToken: string): Promise<void>;
    getToken(key: string): Promise<string | null>;
    removeToken(key: string): Promise<number>;
    removeAllTokens(): Promise<string>;
}
