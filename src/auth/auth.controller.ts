// src/auth/auth.controller.ts
import { Controller, Post, Body, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { EmailService } from 'src/email/email.service';
import { UserService } from 'src/user/user.service';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private emailService: EmailService, 
    private userService: UserService
  ) {}

  @Post('login')
  async login(@Body() body: { email: string, password: string }) {
    const user = await this.authService.validateUser(body.email, body.password);
    if (!user) {
      throw new UnauthorizedException('Credenciais inválidas');
    }
    return this.authService.login(user);
  }


  @Post("update-password")
  async updatePassword(@Body() data: {password: string, token: string}) {
    const emailToken = await this.emailService.findByToken(data.token);

    if (!emailToken) {
      throw new Error('Token inválido ou expirado');
    }

    // Aqui você deve implementar a lógica para atualizar a senha do usuário
    // Por exemplo, chamar um método no UserService para atualizar a senha

    const user = await this.userService.findByEmail(emailToken.email);

    if (!user) {
      throw new Error('Usuário não encontrado');
    }

    const newPassword = data.password;

    await this.userService.updatePassword(user.id, newPassword);



    return { message: 'Senha atualizada com sucesso' };
  }
}
