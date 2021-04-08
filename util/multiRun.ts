/**
 * 按数组并行执行某一个函数
 * @param tasks 传入的数组
 * @param num 并行数量
 */
export function multiRun<T extends () => Promise<void>>(
  tasks: T[],
  num: number,
): Promise<void> {
  let i = num;
  let running = 0;
  return new Promise((resolve) => {
    const done = () => {
      running -= 1;
      if (tasks.length) {
        running += 1;
        tasks.shift()!().then(done);
      } else if (running === 0) {
        resolve();
      }
    };
    while (i > 0 && tasks.length) {
      i -= 1;
      running += 1;
      tasks.shift()!().then(done);
    }
  });
}

