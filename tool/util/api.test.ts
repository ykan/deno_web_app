import { assertEquals } from 'std/testing/asserts.ts';

import * as api from './api.ts';

Deno.test('getItems', async () => {
  const time = performance.now();
  const items = await api.getItems();
  console.log('cost', performance.now() - time);
});


Deno.test('paths:[] shouldChange return false', async () => {
  api.setLastItems([]);
  await api.shouldChange();
  // assertEquals(await api.shouldChange(), true);
});
