// @deno-types="https://deno.land/x/servest/types/react/index.d.ts"
import React from 'https://dev.jspm.io/react/index.js';

export function Layout(props: React.PropsWithChildren<any>) {
  return <html>
    <head>
      <meta charSet="utf-8" />
      <title>deno web app</title>
    </head>
    <body>{props.children}</body>
  </html>;
}
