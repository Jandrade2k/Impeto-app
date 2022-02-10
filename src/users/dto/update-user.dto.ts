import { IsEmail, IsOptional, IsString } from "class-validator";
import { UserRole } from "../user-roles.enum";

export class UpdateUserDto {
    @IsOptional()
    @IsString({
        message: 'Informe um nome válido'
    })
    name: string;

    @IsOptional()
    @IsString({
        message: 'Informe um sobrenome válido' 
    })
    lastName: string;

    @IsOptional()
    @IsEmail({}, {
        message: 'Informa um e-mail válido'
    })
    email: string;

    @IsOptional()
    role: UserRole;

    @IsOptional()
    active: boolean;
}