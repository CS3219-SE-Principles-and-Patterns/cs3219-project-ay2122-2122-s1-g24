import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { User } from '../auth.const';
import { OAuthGoogleConfig } from 'config';
import { Profile, Strategy } from 'passport-google-oauth20';

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
  ): User {
    const {
      provider,
      id: sub,
      _json: { given_name: name, picture },
    } = profile;

    return { sub, name, provider, picture };
  }
}
