import {
    IsEmail,
    IsNotEmpty,
    MaxLength,
    MinLength,
} from 'class-validator';

//TODO: Usar o decorator @Matches para melhorar a segurança da senha.

export class CreateUserDto {
    @IsNotEmpty({
        message: 'Informe um endereço de e-mail'
    })
    @IsEmail(
        {},
        {
            message: 'Informe um endereço de e-mail válido'
        }
    )
    @MaxLength(200, {
        message: 'O endereço de e-mail deve conter menos de 200 caracteres'
    })
    email: string;

    @IsNotEmpty({
        message: 'Informe um nome'
    })
    @MaxLength(200, {
        message: 'O nome deve conter menos de 200 caracteres'
    })
    name: string;

    @IsNotEmpty({
        message: 'Informe um sobrenome'
    })
    @MaxLength(200, {
        message: 'O sobrenome deve conter menos de 200 caracteres'
    })
    lastName: string;
    
    @IsNotEmpty({
        message: 'Informe uma senha'
    })
    @MinLength(6, {
        message: 'A senha deve conter no mínimo 6 caracteres'
    })
    @MaxLength(16, {
        message: 'A senha deve conter menos de 16 caracteres'
    })
    password: string;

    @IsNotEmpty({
        message: 'Informe uma senha'
    })
    @MinLength(6, {
        message: 'A confirmação senha deve conter no mínimo 6 caracteres'
    })
    @MaxLength(16, {
        message: 'A confirmação senha deve conter menos de 16 caracteres'
    })
    
    passwordConfirmation: string;
}