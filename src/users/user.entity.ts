import {
    BaseEntity,
    Entity,
    Unique,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
} from 'typeorm';
import * as bcrypt from 'bcrypt';

@Entity()
@Unique(['email', 'cpf'])
export class User extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ nullable: false, type: 'varchar', length: 200 })
    name: string

    @Column({ nullable: false, type: 'varchar', length: 200 })
    last_name: string

    @Column({ nullable: true, type: 'varchar', length: 11 })
    cpf: string

    @Column({ nullable: true, type: 'varchar', length: 20 })
    role: string;

    @Column({ nullable: true, type: 'varchar', length: 8 })
    cep: string

    @Column({ nullable: true, type: 'varchar', length: 200 })
    street: string

    @Column({ nullable: true, type: 'varchar', length: 5 })
    number: string

    @Column({ nullable: true, type: 'varchar', length: 200 })
    complement: string

    @Column({ nullable: false, type: 'varchar', length: 200 })
    email: string

    @Column({ nullable: false })
    password: string

    @Column({ nullable: true, type: 'float', default: 0.0 })
    value: number

    @Column({ nullable: true, type: 'varchar', length: 11 })
    phone: string

    @Column({ nullable: true, type: 'date' })
    birth: Date

    @Column({ nullable: false })
    salt: string;

    @Column({ default: true })
    active: boolean

    @Column({ nullable: true, type: 'varchar', length: 64 })
    confirmationToken: string;

    @Column({ nullable: true, type: 'varchar', length: 64 })
    recoverToken: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    async checkPassword(password: string): Promise<boolean> {
        const hash = await bcrypt.hash(password, this.salt);
        return hash === this.password;
    }
}
