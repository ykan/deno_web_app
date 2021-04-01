// @deno-types="https://deno.land/x/servest/types/react-dom/server/index.d.ts"
import ReactDOMServer from 'https://dev.jspm.io/react-dom/server.js';
// @deno-types="https://deno.land/x/servest/types/react/index.d.ts"
import React from 'https://dev.jspm.io/react/index.js';
import { HTTPOptions, listenAndServe } from 'std/http/server.ts';

import { env } from './env/prod.ts';
import { Layout, pageMap } from './page/mod.tsx';

const httpOpts: HTTPOptions = {
  port: env.port,
}

await listenAndServe(httpOpts, (req) => {
  const pathKeys = req.url.split('/');
  const namespace = pathKeys[1];
  const name = pathKeys[2];
  console.log(req.url);
  if (namespace === 'p' && pageMap[name]) {
    const { Content } = pageMap[name];
    req.respond({
      headers: new Headers({
        "content-type": "text/html; charset=UTF-8",
      }),
      body: ReactDOMServer.renderToString(
        <Layout>
          <Content />
        </Layout>,
      ),
    });
  } else if (namespace === 'api') {
    req.respond({
      body: 'It is an api',
    });
  } else {
    req.respond({
      body: 'Nothing',
    });
  }

});
