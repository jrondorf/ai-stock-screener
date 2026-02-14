import dotenv from 'dotenv';

dotenv.config();

const isProduction = process.env.NODE_ENV === 'production';

const requireInProduction = (value: string | undefined, fallback: string): string => {
  if (value) {
    return value;
  }

  if (isProduction) {
    throw new Error('Missing required environment variable in production runtime');
  }

  return fallback;
};

export const env = {
  nodeEnv: process.env.NODE_ENV ?? 'development',
  port: Number(process.env.PORT ?? '3000'),
  jwtAccessSecret: requireInProduction(process.env.JWT_ACCESS_SECRET, 'dev-access-secret'),
  jwtRefreshSecret: requireInProduction(process.env.JWT_REFRESH_SECRET, 'dev-refresh-secret')
};
