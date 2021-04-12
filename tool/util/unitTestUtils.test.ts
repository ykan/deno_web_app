import { assertEquals } from 'std/testing/asserts.ts';

import * as ut from './unitTestUtils.ts';

Deno.test('getTestFiles([]) return []', async () => {
  assertEquals(await ut.getTestFiles([]), []);
});
