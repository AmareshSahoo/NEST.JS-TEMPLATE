import { Types } from 'mongoose';
import SignUpDto from '@v1/auth/dto/sign-up.dto';
import { User } from '@v1/users/schemas/users.schema';
import UsersRepository from './users.repository';
import UpdateUserDto from './dto/update-user.dto';
export default class UsersService {
    private readonly usersRepository;
    constructor(usersRepository: UsersRepository);
    create(user: SignUpDto): Promise<User>;
    getUnverifiedUserByEmail(email: string): Promise<User | null>;
    getVerifiedUserByEmail(email: string): Promise<User | null>;
    getById(id: Types.ObjectId): Promise<User | null>;
    getVerifiedUserById(id: Types.ObjectId): Promise<User | null>;
    getUnverifiedUserById(id: Types.ObjectId): Promise<User | null>;
    update(id: Types.ObjectId, data: UpdateUserDto): Promise<User | null>;
    getVerifiedUsers(): Promise<import("@v1/users/schemas/users.schema").UserDocument[]>;
}
