/* eslint-disable prettier/prettier */
import { Module } from "@nestjs/common";
import { UserService } from '../services/user.service';
import { UserController } from "src/controllers/user.controller";

@Module({
  imports: [],
  providers: [UserService],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
