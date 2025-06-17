import { Controller, Post, Body, UseGuards, Get } from '@nestjs/common';
import { EmailService } from './email.service';
import { AuthGuard } from '@nestjs/passport';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';

@Controller('email')
export class EmailController {
  constructor(private readonly emailService: EmailService, private readonly jwtService: JwtService, private readonly userService: UserService) { }

  @Post('send-reset')
  async sendResetEmail(@Body() body: { to: string; name: string }) {
    const user = await this.userService.findByEmail(body.to);
    if (!user) {
      throw new Error('Usuário não encontrado');
    }

    const token = crypto.randomUUID(); 
    await this.emailService.saveToken(user.email, token);

    const resetLink = `http://localhost:3000/new-password-reset?token_pass=${token}`;


    await this.emailService.sendPasswordResetEmail(body.to, body.name, resetLink);

    return { message: 'E-mail enviado com sucesso.' };
  }

  @Get('verify-token')
  async verifyToken(@Body('token') token: string) {
    const emailToken = await this.emailService.findByToken(token);
    if (!emailToken) {
      throw new Error('Token inválido ou expirado');
    }

    const isExpired = emailToken.expiresAt < new Date();
    if (isExpired) {
      throw new Error('Token expirado');
    }

    return { message: 'Token válido', email: emailToken.email };
  }

} 
