import { MongoDBConfig } from './mongoose.config';

export interface OAuthGoogleConfig {
  clientID: string;
  clientSecret: string;
  callbackURL: string;
}

interface Config {
  port: number;
  mongodb: MongoDBConfig;
  oAuthGoogle: OAuthGoogleConfig;
  jwtSecret: string;
  frontendURL: string;
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
    clientID: process.env.OAUTH_GOOGLE_ID,
    clientSecret: process.env.OAUTH_GOOGLE_SECRET,
    callbackURL: process.env.OAUTH_GOOGLE_REDIRECT_URL,
  },
  jwtSecret: process.env.JWT_SECRET,
  frontendURL: process.env.FRONTEND_URL || 'http://localhost:3000',
});

export default config;
