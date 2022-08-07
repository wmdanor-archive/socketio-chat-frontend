import { AppConfig } from './types';

// TODO: resolve "Property 'env' does not exist on type 'ImportMeta'." issue
// ts-ignore temporary used to fix this issue

export const config: AppConfig = {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  backendHost: import.meta.env.VITE_BACKEND_HOST,
};
