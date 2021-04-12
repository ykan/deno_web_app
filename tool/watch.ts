import { debounce } from '@/util/debounce.ts';
import { once } from '@/util/once.ts';

import * as api from './util/api.ts';
import * as ut from './util/unitTestUtils.ts';

const watcher = Deno.watchFs([
  './api',
  './util',
  './tool/util',
]);
const debounceAndOnce = <T extends (...args: any[]) => Promise<void>>(fn: T, time: number) => {
  const onceFn = once(fn);
  return debounce(onceFn, time);
}

const renderAPIItems = debounceAndOnce(async () => {
  console.log('render apis...');
  await api.render();
  console.log('render apis done.');
}, 500);

let testFiles: string[] = [];
const runTests = debounceAndOnce(async () => {
  if (!testFiles.length) return;
  console.log('run tests...');
  const tFiles = Array.from(new Set(testFiles));
  testFiles = [];
  await ut.runTests(tFiles);
}, 500);


for await (const event of watcher) {
  if (await api.shouldChange(event.paths)) {
    console.log(event.paths, 'is changed');
    renderAPIItems();
  }
  // console.log(event.paths);
  testFiles = testFiles.concat(await ut.getTestFiles(event.paths));
  runTests();
}
