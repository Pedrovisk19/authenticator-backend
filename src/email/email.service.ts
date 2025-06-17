// src/email/email.service.ts
import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { ConfigService } from '@nestjs/config';
import { readFile } from 'fs/promises';
import { join } from 'path';
import { Repository } from 'typeorm';
import { EmailToken } from './entities/email-token.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class EmailService {
  constructor(
    private configService: ConfigService,

    @InjectRepository(EmailToken)
    private emailTokenRepo: Repository<EmailToken>,
  ) { }

  async sendPasswordResetEmail(to: string, name: string, resetLink: string) {
    // 1. Lê o template HTML
    const templatePath = join(process.cwd(), 'src', 'email', 'templates', 'reset-password.hbs');

    let html = await readFile(templatePath, 'utf8');

    // 2. Substitui os placeholders com valores reais
    html = html
      .replace(/{{name}}/g, name)
      .replace(/{{resetLink}}/g, resetLink)
      .replace(/{{companyName}}/g, 'DevGoncalves')
      .replace(/{{year}}/g, new Date().getFullYear().toString());

    // 3. Cria o transporte e envia o e-mail
    const transporter = nodemailer.createTransport({
      host: this.configService.get('EMAIL_HOST'),
      port: this.configService.get<number>('EMAIL_PORT'),
      secure: false,
      auth: {
        user: this.configService.get('EMAIL_USER'),
        pass: this.configService.get('EMAIL_PASS'),
      },
    });

    await transporter.sendMail({
      from: `"Minha Empresa" <${this.configService.get('EMAIL_USER')}>`,
      to,
      subject: 'Recuperação de Senha',
      html,
    });
  }

  async saveToken(email: string, token: string, expiresInMinutes = 15) {
    const expiresAt = new Date(Date.now() + expiresInMinutes * 60 * 1000);

    const emailToken = this.emailTokenRepo.create({ email, token, expiresAt });
    return this.emailTokenRepo.save(emailToken);
  }

  
  async findByToken(token: string) {
    const emailToken = await this.emailTokenRepo.findOne({ where: { token } });

    if (!emailToken) {
      throw new Error('Token inválido');
    }

    const now = new Date();
    if (emailToken.expiresAt < now) {
      await this.emailTokenRepo.delete({ email: emailToken.email });
      throw new Error('Token expirado');
    }

    return emailToken;
  }

}
