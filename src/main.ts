import { NestFactory } from "@nestjs/core";
import { UserModule } from "./user/user.module";
import { ValidationPipe } from "@nestjs/common";
import { AppModule } from "./app/app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  // app.useGlobalPipes(new ValidationPipe({
  //   whitelist: true,
  //   transform: true,
    
  // }))
  await app.listen(process.env.PORT ?? 3002);
}
bootstrap();