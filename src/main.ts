import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  // バリデーションをグローバルで使うには、useGlobalPipesを使う
  // whitelistは、不要なデータを削除する。不要なプロパティを削除する。
  await app.listen(3100);
}
bootstrap();
