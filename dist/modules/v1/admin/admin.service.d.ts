import UsersRepository from '@v1/users/users.repository';
export default class AdminService {
    private readonly usersRepository;
    constructor(usersRepository: UsersRepository);
    authAdmin(email: string, password: string): Promise<{
        email: string;
    } | null>;
    isAdmin(email: string, password: string): Promise<boolean | null>;
}
