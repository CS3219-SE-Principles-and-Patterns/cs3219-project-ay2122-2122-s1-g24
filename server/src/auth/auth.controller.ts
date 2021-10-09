import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import AuthService from './auth.service';
import GoogleOAuthGuard from './google/google-oauth.guard';
import JwtAuthGuard from './jwt/jwt.guard';

@Controller()
export default class AuthController {
  public constructor(private readonly authService: AuthService) {}

  @Get('login')
  @UseGuards(GoogleOAuthGuard)
  public login(@Request() req) {
    const accessToken = this.authService.login(req.user);
    const { sub, provider, ...user } = req.user;

    return { accessToken, user };
  }
}
