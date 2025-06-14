/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import { UserService } from "./user.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";

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

  @Post("create")
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Patch(":id")
  update(@Param("id") id: string ,@Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id,updateUserDto);
  }

  @Delete("delete/:id")
  delete(@Param("id") id: number) {
    return this.userService.delete(id);
  }
}
