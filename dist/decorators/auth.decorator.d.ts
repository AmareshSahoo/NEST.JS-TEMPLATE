import { RolesEnum } from '@decorators/roles.decorator';
export default function Auth(...roles: RolesEnum[]): <TFunction extends Function, Y>(target: object | TFunction, propertyKey?: string | symbol | undefined, descriptor?: TypedPropertyDescriptor<Y> | undefined) => void;
