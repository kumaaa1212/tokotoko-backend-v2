import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm'; // 追加
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AppDataSource } from './data-source'; // 追加

@Module({
  imports: [TypeOrmModule.forRoot(AppDataSource.options)], // 修正
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
