/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from "@nestjs/common";
import { UserService } from "./user.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { AuthGuard } from "@nestjs/passport";

@Controller("users")
export class UserController {
  constructor(private readonly userService: UserService) {}
  // Encontra todos os recados
  // /recados/
  @Get()
  findAll() {
    return this.userService.findAll(); 
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.userService.findOne(id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post("create")
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch(":id")
  update(@Param("id") id: string ,@Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id,updateUserDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete("delete/:id")
  delete(@Param("id") id: number) {
    return this.userService.delete(id);
  }
}
