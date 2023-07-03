import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm'
import { Users } from './user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(Users) private readonly usersRepository: Repository<Users>
  ) {
  }

  async create(data: any): Promise<Users> {
    return this.usersRepository.save(data)
  }

  async findOne(condition: any): Promise<Users> {
    return this.usersRepository.findOne({ where: condition });
  }

  delete(id: string) {
    return this.usersRepository.delete(id)
  }
}
