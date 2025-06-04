import { IsNotEmpty, IsString } from "class-validator";

export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    readonly name: string;
    readonly email: string;
    readonly password: string;
    readonly createdAt?: Date;
    readonly updatedAt?: Date;
    readonly primeiroAcesso?: boolean;
}