import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy } from 'passport-google-oauth20';
import { OAuthGoogleConfig } from '../../config';
import { JwtPayload } from '../auth.const';

@Injectable()
export default class GoogleOAuthStrategy extends PassportStrategy(
  Strategy,
  'google',
) {
  constructor(configService: ConfigService) {
    const { clientID, clientSecret, callbackURL }: OAuthGoogleConfig =
      configService.get<OAuthGoogleConfig>('oAuthGoogle');

    super({ clientID, clientSecret, callbackURL, scope: 'profile' });
  }

  public validate(
    _accessToken: string,
    _refreshToken: string,
    profile: Profile,
  ): JwtPayload {
    const {
      provider,
      id: sub,
      _json: { given_name: name, picture },
    } = profile;

    return { sub, name, provider, picture };
  }
}
