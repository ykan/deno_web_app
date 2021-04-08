import { ServerRequest } from 'std/http/server.ts';

import { Env } from './env/base.ts';

export interface RuntimeContext {
  env: Env;
}

export interface RequestContext {
  query?: Record<string, string>;
}

export interface APIResult {
  type: 'success' | 'fail';
  data?: any;
  message?: string;
}

export interface API {
  handler: (req: ServerRequest) => Promise<APIResult>;
}

export type APIFactory = (ctx: RuntimeContext) => Promise<API>;
