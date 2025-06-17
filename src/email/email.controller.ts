import { Controller, Post, Body, UseGuards } from '@nestjs/common';
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

    const token = this.jwtService.sign(
      { userId: user.id },
      { expiresIn: '1h' }
    );

    const resetLink = `http://localhost:3000/users/reset-password?token=${token}`;

    await this.emailService.sendPasswordResetEmail(body.to, body.name, resetLink);

    return { message: 'E-mail enviado com sucesso.' };
  }

} 
