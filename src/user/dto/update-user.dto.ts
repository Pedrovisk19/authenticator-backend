import { IsNotEmpty, IsString } from "class-validator";
import { CreateUserDto } from "./create-user.dto";
import { PartialType } from "@nestjs/mapped-types";

export class UpdateUserDto extends PartialType(CreateUserDto) {
    @IsString()
    @IsNotEmpty()
    readonly name: string;
    readonly email: string;
    readonly password: string;
    readonly primeiroAcesso?: boolean;

}