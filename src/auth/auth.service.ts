import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto, LoginUserDto } from './dto/auth.dto';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/entities/user.entity';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly jwt: JwtService,
    private readonly config: ConfigService,
  ) {}

  async singUp(dto: CreateUserDto) {
    const { name, password } = dto;

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = this.userRepository.create({
      name,
      password: hashedPassword,
      team: '',
      icon: '',
      twitterURL: '',
      teamURL: '',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });
    await this.userRepository.save(user);
    return { message: 'ユーザー登録が完了しました' };
  }

  async login(dto: LoginUserDto): Promise<{ accessToken: string }> {
    const { name, password } = dto;

    const user = await this.userRepository.findOneBy({ name });

    if (user && (await bcrypt.compare(password, user.password))) {
      return this.generateJwt(user.id, user.name);
    }
    throw new UnauthorizedException(
      `ユーザー名またはパスワードを確認してください`,
    );
  }

  async generateJwt(
    userId: string,
    email: string,
  ): Promise<{ accessToken: string }> {
    const payload = { sub: userId, email };
    const secret = this.config.get('JWT_SECRET');
    const token = await this.jwt.signAsync(payload, {
      expiresIn: '5m',
      secret: secret,
    });
    return {
      accessToken: token,
    };
  }
}
