import { exists } from 'std/fs/mod.ts';
import * as path from 'std/path/mod.ts';

const encoder = new TextEncoder();

/**
 * 编译 api 目录整合成一个 ts 文件
 * @param filepathOrTplStr
 */
export async function render() {
  const cwd = Deno.cwd();
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

  console.log('items', items);
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
 * @param paths 变动的文件路径
 */
export async function shouldChange(paths: string[]) {
  for (const subPath of paths) {
    if (!await exists(subPath)) {
      return true;
    }
    const fileInfo = await Deno.lstat(subPath);
    if (fileInfo.isDirectory) {
      return true;
    }
    if (fileInfo.isFile && subPath.includes('mod.ts')) {
      return true;
    }
  }
  return false;
}
