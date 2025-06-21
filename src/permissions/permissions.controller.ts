// src/auth/auth.controller.ts
import { Controller, Post, Body, UnauthorizedException, Get, UseGuards } from '@nestjs/common';
import { PermissionsService } from './permissions.service';
import { EmailService } from 'src/email/email.service';
import { UserService } from 'src/user/user.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { User } from 'src/auth/decorators/user.decorator';
import { AuthGuard } from '@nestjs/passport';

@Controller('user-permissions')
export class PermissionsController {
  constructor(
    private permissionsService: PermissionsService,
    private userService: UserService
  ) { }

  @UseGuards(AuthGuard('jwt'))
  @Get('get-permission')
  async getPermissionsPerUser(@User() user: { userId: number }) {
    return await this.permissionsService.getPermission(user.userId);
  }

  @Post("save-permission")
  async savePermission(data: any) {
    await this.permissionsService.savePermission(data);
  }
}