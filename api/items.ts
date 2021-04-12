import { APIFactory } from '@/types.ts';

import { createAPI as createAPI0 } from './default/mod.ts';
import { createAPI as createAPI1 } from './sum/mod.ts';

type Item = [string, APIFactory];
export const items: Item[] = [
  ['default', createAPI0],
  ['sum', createAPI1],
];