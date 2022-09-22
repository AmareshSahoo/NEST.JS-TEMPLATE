export declare enum RolesEnum {
    ADMIN = "admin",
    USER = "user"
}
export declare const Roles: (...roles: RolesEnum[]) => import("@nestjs/common").CustomDecorator<string>;
