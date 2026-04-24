import { Body, Controller, Get, Post, Req, Res } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import type { Request, Response } from 'express';
import { LoginDto } from 'src/auth/dto/login.dto';
import { RegisterDto } from 'src/auth/dto/register.dto';
import { AuthService } from './auth.service';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  private errorByStatus: Record<string, string> = {
    UNAUTHORIZED: 'Email ou senha inválidos',
    FORBIDDEN: 'Acesso negado',
    BAD_REQUEST: 'Dados inválidos',
    UNPROCESSABLE_ENTITY: 'O usuário já existe. Use outro endereço de e-mail.',
  };

  @Post('register')
  async register(
    @Body() body: RegisterDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const result: any = await this.authService.register(body);
    console.log(result);

    if (result?.error) {
      const message =
        this.errorByStatus[result.error.status] ??
        'Erro ao processar requisição';

      return {
        error: {
          message,
          status: result.error.status,
        },
      };
    }

    const setCookie = result.headers?.get('set-cookie');
    if (setCookie) res.setHeader('set-cookie', setCookie);
    return result.response;
  }

  @Post('login')
  async login(
    @Body() body: LoginDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const result: any = await this.authService.login(body);
    console.log(result);

    if (result?.error) {
      const message =
        this.errorByStatus[result.error.status] ??
        'Erro ao processar requisição';

      return {
        error: {
          message,
          status: result.error.status,
        },
      };
    }

    const setCookie = result.headers?.get('set-cookie');
    if (setCookie) res.setHeader('set-cookie', setCookie);

    return result.response;
  }

  @Post('logout')
  async logout(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    const headers = new Headers();
    const cookie = req.headers.cookie;
    if (cookie) headers.set('cookie', cookie);

    const result = await this.authService.logout(headers);
    console.log(result);

    const setCookie = result.headers?.get('set-cookie');
    if (setCookie) res.setHeader('set-cookie', setCookie);

    return result.response;
  }

  @Get('me')
  async me(@Req() req: Request) {
    const headers = new Headers();
    const cookie = req.headers.cookie;
    if (cookie) headers.set('cookie', cookie);

    return await this.authService.getSession(headers);
  }
}
