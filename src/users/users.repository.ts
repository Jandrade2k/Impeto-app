import { EntityRepository, Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UserRole } from './user-roles.enum';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';
import { ConflictException, InternalServerErrorException } from '@nestjs/common';
import { CredentialsDto } from './dto/credentials.dto';
import { FindUserQueryDto } from './dto/find-users-query.dto';


@EntityRepository(User)
export class UserRepository extends Repository<User> {

    async findUsers(
        queryDto: FindUserQueryDto,
    ): Promise<{users: User[]; total: number}> {
        queryDto.active = queryDto.active === undefined ? true : queryDto.active;
        queryDto.page = queryDto.page < 1 ? 1 : queryDto.page;
        queryDto.limit = queryDto.limit > 100 ? 100 : queryDto.limit;

        const {name, lastName, email, active, role} = queryDto;
        const query = this.createQueryBuilder('user');
        query.where('user.active = :active', {active});

        if (email) {
            query.andWhere('user.email ILIKE :email', {email: `%${email}%`});
        }

        if (name) {
            query.andWhere('user.name ILIKE :name', {name: `%${name}%`});
        }

        if (lastName) {
            query.andWhere('user.last_name ILIKE :last_name', {name: `%${lastName}%`});
        }

        if (role) {
            query.andWhere('user.role ILIKE :role', {role: `%${role}%`});
        }
        query.skip((queryDto.page -1) * queryDto.limit);
        query.take(+query.limit);
        query.orderBy(queryDto.sort ? JSON.parse(queryDto.sort) : undefined);
        query.select(['user.name', 'user.last_name', 'user.email', 'user.role', 'user.active']);

        const [users, total] = await query.getManyAndCount();

        return {
            users,
            total
        }
    }

    async createUser(
        createUserDto: CreateUserDto,
        role: UserRole,
    ): Promise<User> {
        const {
            name,
            lastName,
            password,
            email
        } = createUserDto;

        const user = this.create();

        user.name = name;
        user.last_name = lastName;
        user.email = email;
        user.role = role;
        user.active = true;
        user.confirmationToken = crypto.randomBytes(32).toString('hex');
        user.salt = await bcrypt.genSalt();
        user.password = await this.hashPassword(password, user.salt);
        try {
            await user.save()
            delete user.password;
            delete user.salt;
            return user;
        } catch (error) {
            if (error.code.toString() === '23505') {
                throw new ConflictException('Endereço de e-mail já está em uso');
            } else {
                throw new InternalServerErrorException('Erro do servidor, impossivel salvar usuário');
            }
        }

    }

    async checkCredentials(credentialsDto: CredentialsDto): Promise<User> {
        const { email, password } = credentialsDto;
        const user = await this.findOne({ email, active: true });
    
        if (user && (await user.checkPassword(password))) {
          return user;
        } else {
          return null;
        }
      }

    private async hashPassword(password:string, salt:string): Promise<string> {
        return bcrypt.hash(password, salt);
    }
}