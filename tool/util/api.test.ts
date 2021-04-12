import { assertEquals } from 'std/testing/asserts.ts';

import * as api from './api.ts';

Deno.test('[] shouldChange return false', async () => {
  assertEquals(await api.shouldChange([]), false);
});
