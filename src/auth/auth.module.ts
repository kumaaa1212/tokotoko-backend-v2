import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategy/jwt.strategy';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    JwtModule.register({}),
    TypeOrmModule.forFeature([User]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  exports: [JwtAuthGuard],
  providers: [AuthService, JwtStrategy, JwtAuthGuard],
  controllers: [AuthController],
})
export class AuthModule {}

// JwtStrategyをauthに入れて、authを他のところで使えるようにする。

// @UseGuards(JwtAuthGuard)で使う
// Jwtでプロテクトしている。しかしプロジェクトによって、cookieかheadrかわからない。optipnを別ファイルで作成できる。
// JwtAuthGuard→AuthGuard→JwtStrategy
