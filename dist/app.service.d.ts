import { Users } from './user.entity';
import { Repository } from 'typeorm';
export declare class AppService {
    private readonly usersRepository;
    constructor(usersRepository: Repository<Users>);
    create(data: any): Promise<Users>;
    findOne(condition: any): Promise<Users>;
    delete(id: string): Promise<import("typeorm").DeleteResult>;
}
