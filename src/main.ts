import { NestFactory } from "@nestjs/core";
import { ValidationPipe } from "@nestjs/common";
import { AppModule } from "./app/app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: 'http://localhost:3000', // URL do seu frontend
    credentials: true, // 🔥 necessário para cookies
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE','OPTIONS'], // ← não esqueça do OPTIONS

  });

  // app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

  await app.listen(process.env.PORT ?? 3002);
}
bootstrap();
