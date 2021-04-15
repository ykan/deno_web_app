import { cyan, gray } from 'std/fmt/colors.ts';

import { formatNow } from '@/util/mod.ts';

export function logFsEvent(e: Deno.FsEvent) {
  const head = gray(`[${formatNow()}]`);
  const kind = cyan(e.kind);
  const cwd = Deno.cwd();
  const paths = e.paths.map(p => p.replace(cwd, '.'));
  console.log(`${head} ${kind} - ${paths.join(',')}`);
}
