import { assertEquals, assertThrowsAsync } from 'std/testing/asserts.ts';

import { multiRun } from './multiRun.ts';
import { wait } from './wait.ts';

function makeTask(time: number) {
  return async () => {
    await wait.time(time);
  };
}

type Task = () => Promise<void>;

Deno.test('multi-run测试', async () => {
  const arr: Task[] = [
    makeTask(10),
    makeTask(5),
    makeTask(10),
    makeTask(5),
  ];
  const time = performance.now();

  await multiRun(
    arr,
    2,
  );
  assertEquals(performance.now() - time < 30, true);
});
