// src/protected/protected.controller.ts
import { Controller, Get, UseGuards, Request } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller('profile')
export class ProfileController {
  @UseGuards(AuthGuard('jwt'))
  @Get()
  getProfile(@Request() req) {
    return req.user; // payload do token
  }
}
