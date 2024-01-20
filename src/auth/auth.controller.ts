import { Body, Controller, Get, HttpCode, Req } from '@nestjs/common';
import { HttpStatus, Post, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto, LoginUserDto } from './dto/auth.dto';
import { Csrf, Msg } from './interface';
import { Request, Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('csrf')
  getCsrfToken(@Req() req: Request): Csrf {
    return { csrfToken: req.csrfToken() };
    // csrfTokenはcsrfTokenを生成するメソッド
    // Keyをふよする処理は、app.module.tsに書く。自動で付与される。
    // csrfTokenをreturnして、フロント側でcookieにセットする。
  }

  @Post('signup')
  signUp(@Body() dto: CreateUserDto): Promise<Msg> {
    return this.authService.singUp(dto);
  }

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(
    @Body() dto: LoginUserDto,
    @Res({ passthrough: true }) res: Response,
  ): Promise<Msg> {
    const jwt = await this.authService.login(dto);
    res.cookie('access_token', jwt.accessToken, {
      httpOnly: true,
      secure: true,
      // secure: false,
      sameSite: 'none',
      path: '/',
    });
    return {
      message: 'ok',
    };
  }

  @HttpCode(HttpStatus.OK)
  @Post('/logout')
  logout(@Req() req: Request, @Res({ passthrough: true }) res: Response): Msg {
    res.cookie('access_token', '', {
      httpOnly: true,
      secure: true,
      // secure: false,
      sameSite: 'none',
      path: '/',
    });
    return {
      message: 'ok',
    };
  }
}
