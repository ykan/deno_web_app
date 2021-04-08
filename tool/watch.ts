import * as api from './util/api.ts';

const watcher = Deno.watchFs('./api');

const debounce = (fn: () => void, time: number) => {
  let timer = -1;
  return () => {
    clearTimeout(timer);
    timer = setTimeout(fn, time);
  };
};

const render = debounce(async () => {
  console.log('render apis...');
  await api.render();
  console.log('render apis done.');
}, 500);

for await (const event of watcher) {
  if (await api.shouldChange(event.paths)) {
    console.log(event.paths, 'is changed');
    render();
  }
}
