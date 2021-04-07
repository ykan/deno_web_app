import { assertEquals } from 'std/testing/asserts.ts';

import { getIndexTpl } from './autoIndexFile.ts';

Deno.test('get index tpl', async () => {
  assertEquals('ss', await getIndexTpl('ss'));
});
