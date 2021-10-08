import { Controller, Get, Post } from '@nestjs/common';

@Controller()
export default class AuthController {
  @Post('login')
  public async login() {
    /* temp */
  }

  @Get('logout')
  public async logout() {
    /* temp */
  }
}
