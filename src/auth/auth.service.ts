// src/auth/auth.service.ts
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserPermissions } from 'src/permissions/entites/user-permissions.entity';
import { PermissionsService } from 'src/permissions/permissions.service';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private userPermissionsService: PermissionsService
  ) { }

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userService.findByEmail(email);
    if (user && await bcrypt.compare(password, user.password)) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {

    const permissions = await this.userPermissionsService.getPermission(user.id);

    const payload = {
      email: user.email,
      sub: user.id,
      allowEdit: permissions?.allowEdit ?? false,
      allowView: permissions?.allowView ?? false,
    };

    return {
      token: this.jwtService.sign(payload, { expiresIn: '1h', secret: process.env.JWT_SECRET })

    };
  }

}
