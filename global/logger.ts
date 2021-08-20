import { getLogger, handlers, setup } from 'std/log/mod.ts';

import { formatNow } from '../util/mod.ts';

export async function setupLogger() {
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
  return getLogger();
}
