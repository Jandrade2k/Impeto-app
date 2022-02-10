import { Body, Controller, Get, Post, Req, UseGuards, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { CredentialsDto } from 'src/users/dto/credentials.dto';
import { User } from 'src/users/user.entity';
import { AuthService } from './auth.service';
import { GetUser } from './get-user.decorator';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService){}

    @Post('/signup')
    async signUp(
        @Body(ValidationPipe) createUserDto: CreateUserDto,
    ): Promise<{message:string}>{
        await this.authService.singUp(createUserDto);
        return {
            message: 'Cadastro realizado com sucesso',
        }
    }

    @Post('/signin')
    async signIn(
        @Body(ValidationPipe) credentialsDto: CredentialsDto,
    ): Promise<{token:string}> {
        return await this.authService.signIn(credentialsDto);
    }

    @Get('/me')
    @UseGuards(AuthGuard())
    getMe(@GetUser() user: User): User {
        return user;
    }
}
