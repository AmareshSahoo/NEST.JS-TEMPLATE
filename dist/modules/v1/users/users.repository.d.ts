import { Types, Model } from 'mongoose';
import SignUpDto from '@v1/auth/dto/sign-up.dto';
import { UserDocument, User } from '@v1/users/schemas/users.schema';
import UpdateUserDto from './dto/update-user.dto';
export default class UsersRepository {
    private usersModel;
    constructor(usersModel: Model<UserDocument>);
    create(user: SignUpDto): Promise<User>;
    getUnverifiedUserByEmail(email: string): Promise<User | null>;
    getVerifiedUserByEmail(email: string): Promise<User | null>;
    getById(id: Types.ObjectId): Promise<User | null>;
    getVerifiedUserById(id: Types.ObjectId): Promise<User | null>;
    getUnverifiedUserById(id: Types.ObjectId): Promise<User | null>;
    updateById(id: Types.ObjectId, data: UpdateUserDto): Promise<User | null>;
    getAll(): Promise<UserDocument[]>;
    getVerifiedUsers(): Promise<UserDocument[]>;
    getVerifiedAdminByEmail(email: string): Promise<User | null>;
}
