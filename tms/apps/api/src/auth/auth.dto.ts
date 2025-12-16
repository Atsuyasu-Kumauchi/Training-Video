import { IsEmail, IsNotEmpty, IsString, IsStrongPassword, Matches, MaxLength, MinLength } from "class-validator";


export class LoginDto {

    @IsString()
    @IsNotEmpty()
    username: string;

    @IsString()
    @IsNotEmpty()
    password: string;

}

export class SignUpDto {

    @IsString()
    @IsNotEmpty()
    @MinLength(3)
    @MaxLength(25)
    @Matches(/^[a-zA-Z0-9]+$/)
    username: string;

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsNotEmpty()
    @IsStrongPassword()
    password: string;

}
