import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm'; // 追加
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AppDataSource } from './data-source'; // 追加
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forRoot(AppDataSource.options),
    ConfigModule.forRoot({ isGlobal: true }),
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

// 全体で使いたいから、ConfigModuleをapp.module.tsに追加した。
