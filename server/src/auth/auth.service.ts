import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './auth.const';

@Injectable()
export default class AuthService {
  public constructor(private readonly jwtService: JwtService) {}

  public login(jwtPayload: JwtPayload): string {
    return this.jwtService.sign(jwtPayload);
  }

  public verify(token: string): JwtPayload {
    return this.jwtService.verify(token);
  }
}
