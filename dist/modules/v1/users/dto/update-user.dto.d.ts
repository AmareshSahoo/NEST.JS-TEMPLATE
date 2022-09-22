import SignUpDto from '@v1/auth/dto/sign-up.dto';
declare const UpdateUserDto_base: import("@nestjs/common").Type<Partial<SignUpDto>>;
export default class UpdateUserDto extends UpdateUserDto_base {
    readonly verified: boolean;
}
export {};
