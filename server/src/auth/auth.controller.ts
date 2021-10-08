import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import GoogleOAuthGuard from './google/google-oauth.guard';

@Controller()
export default class AuthController {
  @Get('login')
  @UseGuards(GoogleOAuthGuard)
  public async login() {
    /* Guard redirects */
  }

  @Get('login/redirect')
  @UseGuards(GoogleOAuthGuard)
  public async redirect(@Request() req) {
    return req.user;
  }

  @Get('logout')
  public async logout() {
    /* temp */
  }
}
