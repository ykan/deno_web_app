import { HTTPOptions, listenAndServe } from 'std/http/server.ts';
import { getLogger, handlers, setup } from 'std/log/mod.ts';

import { createAPIMap } from './api/mod.ts';
import { env } from './env/prod.ts';
import { RuntimeContext } from './types.ts';
import { formatNow } from './util/mod.ts';

async function main() {
  await setup({
    handlers: {
      console: new handlers.ConsoleHandler('DEBUG', {
        formatter: (logRecord) => `[${formatNow()}][${logRecord.levelName}] - ${logRecord.msg}`
      }),
    },

    loggers: {
      default: {
        level: 'DEBUG',
        handlers: ['console'],
      },
    },
  });
  const logger = getLogger();
  const runtimeCtx: RuntimeContext = {
    env,
    logger,
  };
  const map = await createAPIMap(runtimeCtx);

  const httpOpts: HTTPOptions = {
    port: env.port,
  }
  await listenAndServe(httpOpts, async (req) => {
    const urlKeys = req.url.split('?');
    const pathKeys = urlKeys[0].split('/');
    const namespace = pathKeys[1];
    const name = pathKeys[2];
    if (namespace === 'api') {
      if (map[name]) {
        logger.info(`match api:${name}`);
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

