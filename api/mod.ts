import { API, APIFactory, RuntimeContext } from '@/types.ts';
import { multiRun } from '@/util/multiRun.ts';

import { items } from './items.ts';

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
  const tasks = items.map((item) => {
    const [name, createAPI] = item;
    return initSingleApi(name, createAPI);
  });
  await multiRun(tasks, 5);
  return map;
}

