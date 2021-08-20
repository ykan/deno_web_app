
import { createAPIMap } from './api/mod.ts';
import { env } from './env/prod.ts';
import { setupLogger } from './global/logger.ts';
import { response } from './global/response.ts';
import { RuntimeContext } from './types.ts';

const logger = await setupLogger();
const runtimeCtx: RuntimeContext = {
  env,
  logger,
  response,
};
const map = await createAPIMap(runtimeCtx);


async function handleRequest({ request, respondWith }: Deno.RequestEvent) {
  const url = new URL(request.url);
  const pathKeys = url.pathname.split('/');
  const namespace = pathKeys[1];
  const name = pathKeys[2];
  const requestContext = {
    request,
    respondWith,
    url
  };
  if (namespace === 'api') {
    if (map[name]) {
      logger.info(`match api:${name}`);
      await map[name].handler(requestContext);
    } else if (map['default']) {
      await map['default'].handler(requestContext);
    }
  } else {
    respondWith(new Response(JSON.stringify({
      body: 'Nothing',
    })))
  }
}


async function handleConn(conn: Deno.Conn) {
  const httpConn = Deno.serveHttp(conn);
  while (true) {
    try {
      const requestEvent = await httpConn.nextRequest();
      if (requestEvent) {
        handleRequest(requestEvent);
      }
    } catch (err) {
      logger.error(`Request error: ${err}`);
      break;
    }
  }
}

const server = Deno.listen({
  port: env.port,
});
while (true) {
  try {
    const conn = await server.accept();
    handleConn(conn);
  } catch (err) {
    logger.error(`Connect error: ${err}`);
    // The listener has closed
    break;
  }
}
