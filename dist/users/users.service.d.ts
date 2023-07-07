import { Repository } from 'typeorm';
import { Users } from '../user.entity';
import { CreateUserDto } from '../create-user.dto';
export declare class UsersService {
    private usersRepository;
    constructor(usersRepository: Repository<Users>);
    register(createUserDto: CreateUserDto): Promise<Users[]>;
}
