import { HTTPOptions, listenAndServe } from 'std/http/server.ts';

import { createAPIMap } from './api/mod.ts';
import { env } from './env/prod.ts';
import { RuntimeContext } from './types.ts';

const httpOpts: HTTPOptions = {
  port: env.port,
}


async function main() {
  const runtimeCtx: RuntimeContext = {
    env,
  };
  const map = await createAPIMap(runtimeCtx);

  await listenAndServe(httpOpts, async (req) => {
    const urlKeys = req.url.split('?');
    const pathKeys = urlKeys[0].split('/');
    const namespace = pathKeys[1];
    const name = pathKeys[2];
    if (namespace === 'api') {
      if (map[name]) {
        await map[name].handler(req);
      } else if (map['default']) {
        await map['default'].handler(req);
      }
    } else {
      req.respond({
        body: 'Nothing',
      });
    }
  });

}

await main();

