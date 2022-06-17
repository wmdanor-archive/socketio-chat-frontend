import { AppConfig } from './types';

declare const process: { env: Record<string, string> };

export const config: AppConfig = {
  backendHost: process.env.BACKEND_HOST,
};
