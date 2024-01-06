import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategy/jwt.strategy';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@Module({
  imports: [JwtModule.register({})],
  exports: [JwtAuthGuard],
  providers: [AuthService, JwtStrategy, JwtAuthGuard],
  controllers: [AuthController],
})
export class AuthModule {}

// JwtStrategyをauthに入れて、authを他のところで使えるようにする。

// @UseGuards(JwtAuthGuard)で使う
// Jwtでプロテクトしている。しかしプロジェクトによって、cookieかheadrかわからない。optipnを別ファイルで作成できる。
// JwtAuthGuard→AuthGuard→JwtStrategy
