import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';
import { Request } from 'express';
import * as csurf from 'csurf';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  // バリデーションをグローバルで使うには、useGlobalPipesを使う
  // whitelistは、不要なデータを削除する。不要なプロパティを削除する。
  app.enableCors({
    credentials: true,
    origin: [
      'http://localhost:3000',
      'https://frontend-todo-nextjs.vercel.app',
    ],
  });

  app.use(cookieParser());
  app.use(
    csurf({
      cookie: {
        httpOnly: true,
        // ブラウザで読み込まれたくないから
        sameSite: 'none',
        secure: true,
      },
      value: (req: Request) => {
        return req.header('csrf-token');
      },
    }),
  );

  await app.listen(3100);
}
bootstrap();
