import { AsyncFunction } from './types.ts';

/**
 * 限制异步函数不能同时执行
 * @param fn asnyc function
 */
export function once<T extends AsyncFunction<void>>(fn: T) {
  let isCalling = false;
  const wrapFn = async (...args: any[]) => {
    if (isCalling) return;
    isCalling = true;
    await fn(...args).finally(() => {
      isCalling = false;
    });
    isCalling = false;
  };

  return wrapFn as T;
}
