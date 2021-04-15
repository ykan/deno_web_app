import { exists } from 'std/fs/mod.ts';
import * as path from 'std/path/mod.ts';

const encoder = new TextEncoder();
// make 一定是根目录执行的，暂时当根目录用
const cwd = Deno.cwd();

export async function getItems() {
  const items: string[] = [];
  const apiDir = path.join(cwd, 'api');
  for await (const dirEntry of Deno.readDir(apiDir)) {
    if (dirEntry.isDirectory) {
      const modPath = path.join(apiDir, `${dirEntry.name}/mod.ts`);
      if (await exists(modPath)) {
        items.push(dirEntry.name);
      }
    }
  }
  return items;
}

let lastItems: string[] = [];
export function setLastItems(items: string[]) {
  lastItems = items;
}
/**
 * 编译 api 目录整合成一个 ts 文件
 */
export async function render() {
  const items = await getItems();
  setLastItems(items);

  const importContent = items.map(
    (item, index) => `import { createAPI as createAPI${index} } from './${item}/mod.ts';`
  ).join('\n');
  const itemContent = items.map(
    (item, index) => `  ['${item}', createAPI${index}],`
  ).join('\n');

  const code = `
import { APIFactory } from '@/types.ts';

${importContent}

type Item = [string, APIFactory];
export const items: Item[] = [
${itemContent}
];
  `.trim();
  const targetPath = path.join(cwd, 'api/items.ts');
  await Deno.writeFile(targetPath, encoder.encode(code));
}


/**
 * 判断是否要重新构建整个目录的文件
 * @param e 变化的事件
 */
export async function shouldChange() {
  const items = await getItems();
  if (items.length !== lastItems.length) {
    return true;
  }
  for (let i = 0; i < items.length; i++) {
    const lastItem = lastItems[i];
    const newItem = items[i];
    // 都是读文件夹，应该是同一个顺序的
    if (lastItem !== newItem) {
      return true;
    }
  }

  return false;
}
