import { Document } from 'mongoose';
import { RolesEnum } from '@decorators/roles.decorator';
export declare class User {
    email: string;
    password: string;
    verified: boolean;
    roles: RolesEnum[];
}
export declare type UserDocument = User & Document;
export declare const UserSchema: import("mongoose").Schema<Document<User, any, any>, import("mongoose").Model<Document<User, any, any>, any, any>, undefined, {}>;
