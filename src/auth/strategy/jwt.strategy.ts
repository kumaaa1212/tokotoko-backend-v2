import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';

// Injectableがついているから、importする必要があり

// PassportStrategyと言う抽象クラス。PassportStrategyは抽象メソッドを持っており、JwtStrategyで使うには、実装する必要がある。
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    private readonly config: ConfigService,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {
    super({
      // JWTが正しいかどうかの検証を行う。→問題なければ、validate()が呼ばれる
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req) => {
          let jwt = null;
          if (req && req.cookies) {
            jwt = req.cookies['access_token'];
          }
          return jwt;
        },
      ]),
      ignoreExpiration: false,
      // 有効期限を無視するか
      secretOrKey: config.get('JWT_SECRET'),
    });
  }

  async validate(payload: { sub: string; email: string }) {
    const { sub: id } = payload;
    // payloadにきているのは、上でsecretOrKeyとJWTがあり、復元された状態できている
    const user = await this.userRepository.findOneBy({ id });
    delete user.password;
    // ここのreturnをreqに含めてくれる。gurdはその機能がある。

    if (user) {
      return user;
      // ここのreturnはリクエストオブジェクトのプロパティに入る
    }
    throw new UnauthorizedException();
  }
}
