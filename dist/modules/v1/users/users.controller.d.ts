import { Types } from 'mongoose';
import { User } from './schemas/users.schema';
import UsersService from './users.service';
export default class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    getById(id: Types.ObjectId): Promise<User>;
    getAllVerifiedUsers(): Promise<import("./schemas/users.schema").UserDocument[]>;
}
