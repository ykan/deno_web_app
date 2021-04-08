import { API, APIFactory, RuntimeContext } from '@/types.ts';
import { multiRun } from '@/util/multiRun.ts';

import { createAPI as default_createAPI } from './default/mod.ts';
import { createAPI as sum_createAPI } from './sum/mod.ts';

export async function createAPIMap(runtimeCtx: RuntimeContext) {
  const map: Record<string, API> = {};
  const initSingleApi = (name: string, apiFactory: APIFactory) => {
    return async () => {
      const api = await apiFactory(runtimeCtx);
      const newApi: API = {
        handler: async (req) => {
          const result = await api.handler(req);
          req.respond({
            body: JSON.stringify(result),
          });
          return result;
        }
      };
      map[name] = newApi;
    };
  }
  const tasks = [
    initSingleApi('default', default_createAPI),
    initSingleApi('sum', sum_createAPI),
  ];
  await multiRun(tasks, 5);
  return map;
}

