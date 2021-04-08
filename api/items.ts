import { APIFactory } from '@/types.ts';

import { createAPI as createAPI0 } from './testa/mod.ts';
import { createAPI as createAPI1 } from './default/mod.ts';
import { createAPI as createAPI2 } from './sum/mod.ts';

type Item = [string, APIFactory];
export const items: Item[] = [
  ['testa', createAPI0],
  ['default', createAPI1],
  ['sum', createAPI2],
];