import { Controller, Get, Request, UseGuards, Response } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import AuthService from './auth.service';
import GoogleOAuthGuard from './google/google-oauth.guard';

@Controller()
export default class AuthController {
  private readonly frontendURL: string;

  public constructor(
    private readonly authService: AuthService,
    configService: ConfigService,
  ) {
    this.frontendURL = configService.get<string>('frontendURL');
  }

  @Get('login')
  @UseGuards(GoogleOAuthGuard)
  public login(@Request() req, @Response() res) {
    const accessToken = this.authService.login(req.user);
    const { sub, provider, ...user } = req.user;

    return res.redirect(
      `${
        this.frontendURL
      }/setAuth?accessToken=${accessToken}&user=${JSON.stringify(user)}`,
    );
  }
}
