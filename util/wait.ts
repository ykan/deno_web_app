/**
 * 相当于 sleep 一段时间
 * @param ms 等待的毫秒数
 */
function time(ms: number) {
  return new Promise(resolve => {
    setTimeout(resolve, ms);
  });
}

export const wait = {
  time,
};
