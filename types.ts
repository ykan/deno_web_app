import type { Logger } from 'std/log/mod.ts';

import type { Env } from './env/base.ts';
import type { GlobalResponse } from './global/response.ts';

export interface RuntimeContext {
  env: Env;
  logger: Logger;
  response: GlobalResponse;
}

export interface RequestContext extends Deno.RequestEvent {
  url: URL;
}

export interface APIResult<T = any> {
  type: 'success' | 'fail';
  data?: T;
  message?: string;
}

export interface API<T = any> {
  handler: (req: RequestContext) => Promise<APIResult<T>> | APIResult<T>;
}

export type APIFactory<T = any> = (ctx: RuntimeContext) => Promise<API<T>> | API<T>;
