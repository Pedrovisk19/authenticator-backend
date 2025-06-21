// src/auth/auth.service.ts
import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { UserPermissions } from './entites/user-permissions.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class PermissionsService {
  constructor(
    @InjectRepository(UserPermissions)
    private userPermissionRepository: Repository<UserPermissions>
  ) { }

  getPermission(userId: number) {

    const userPermission = this.userPermissionRepository.findOne({
      where: {
        userId: userId,
      },
    });

    return userPermission;

  }

  savePermission(data: any) {
    return this.userPermissionRepository.save(data);
  }

}