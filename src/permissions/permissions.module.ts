// src/auth/auth.module.ts
import { Module } from '@nestjs/common';
import { UserModule } from '../user/user.module';
import { PermissionsController } from './permissions.controller';
import { PermissionsService } from './permissions.service';
import { UserPermissions } from './entites/user-permissions.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    UserModule,
    TypeOrmModule.forFeature([UserPermissions])
  ],
  providers: [PermissionsService],
  exports: [PermissionsService],
  controllers: [PermissionsController],

})
export class PermissionsModule { }
