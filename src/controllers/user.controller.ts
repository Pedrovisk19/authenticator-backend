/* eslint-disable prettier/prettier */
import { Controller, Get } from '@nestjs/common';
import { UserService } from 'src/services/user.service';

@Controller("users")
export class UserController {
  constructor(private readonly userService: UserService){}

  @Get()
  getHello(): string {
    return this.userService.findAll();
  }
}
