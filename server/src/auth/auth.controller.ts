import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import GoogleOAuthGuard from './google/google-oauth.guard';

@Controller()
export default class AuthController {
  @Get('login')
  @UseGuards(GoogleOAuthGuard)
  public login(@Request() req) {
    return req.user;
  }
}
