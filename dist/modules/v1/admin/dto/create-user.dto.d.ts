import SignInDto from '@v1/auth/dto/sign-in.dto';
import { ICreateUser } from '@v1/admin/interfaces/user.interface';
import { RolesEnum } from '@decorators/roles.decorator';
export default class CreateUserDto extends SignInDto {
    constructor({ email, password, roles, verified, }: ICreateUser);
    readonly roles: RolesEnum[];
    readonly verified: boolean;
}
