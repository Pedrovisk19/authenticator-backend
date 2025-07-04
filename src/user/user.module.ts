/* eslint-disable prettier/prettier */
import { Module } from "@nestjs/common";
import { UserController } from "src/user/user.controller";
import { UserService } from "./user.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "./entities/user.entity";

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService,TypeOrmModule],
})
export class UserModule {}