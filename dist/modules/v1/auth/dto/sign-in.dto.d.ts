export default class SignInDto {
    constructor(body?: SignInDto | null);
    readonly email: string;
    readonly password: string;
}
