import { MongoDBConfig } from './mongoose.config';

export interface OAuthGoogleConfig {
  id: string;
  secret: string;
  redirectUrl: string;
}

interface Config {
  port: number;
  mongodb: MongoDBConfig;
  oAuthGoogle: OAuthGoogleConfig;
  jwtSecret: string;
}

const config = (): Config => ({
  port: parseInt(process.env.LISTEN_PORT, 10) || 8080,
  mongodb: {
    host: process.env.MONGODB_HOST || 'localhost',
    protocol: process.env.MONGODB_PROTOCOL || 'mongodb',
    database: process.env.MONGODB_DATABASE,
    username: process.env.MONGODB_USERNAME,
    password: process.env.MONGODB_PASSWORD || '',
  },
  oAuthGoogle: {
    id: process.env.OAUTH_GOOGLE_ID,
    secret: process.env.OAUTH_GOOGLE_SECRET,
    redirectUrl: process.env.OAUTH_GOOGLE_REDIRECT_URL,
  },
  jwtSecret: process.env.JWT_SECRET,
});

export default config;
