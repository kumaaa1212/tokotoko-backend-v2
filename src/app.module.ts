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
    AuthModule,
    ConfigModule.forRoot({ isGlobal: true }),
  ], // 修正
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
