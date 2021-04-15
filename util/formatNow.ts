import { format } from 'std/datetime/mod.ts';

export function formatNow() {
  return format(new Date(), 'yyyy-MM-dd HH:mm:ss.SSS');
}
