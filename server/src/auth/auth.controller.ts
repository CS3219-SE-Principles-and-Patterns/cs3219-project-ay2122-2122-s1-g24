import { Controller, Get, Request, UseGuards, Redirect, Response } from '@nestjs/common';
import AuthService from './auth.service';
import GoogleOAuthGuard from './google/google-oauth.guard';


@Controller()
export default class AuthController {
  public constructor(private readonly authService: AuthService) {}

  @Get('login')
  @UseGuards(GoogleOAuthGuard)
  public login(@Request() req, @Response() res) {
    const accessToken = this.authService.login(req.user);
    const { sub, provider, ...user } = req.user;

    return res.redirect(`http://localhost:3000/setAuth?accessToken=${accessToken}&user=${JSON.stringify(user)}`)
  }
}
