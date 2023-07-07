import { UsersService } from './users.service';
import { CreateUserDto } from '../create-user.dto';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    register(createUserDto: CreateUserDto): Promise<import("../user.entity").Users[]>;
}
