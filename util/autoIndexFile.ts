import { exists } from 'std/fs/mod.ts';

const decoder = new TextDecoder("utf-8");
/**
 * 获取 index 文件的模板
 * @param filepathOrTplStr
 */
export async function getIndexTpl(filepathOrTplStr: string) {
  if (await exists(filepathOrTplStr)) {
    const data = await Deno.readFile(filepathOrTplStr);
    return decoder.decode(data);
  }
  return filepathOrTplStr;
}

/**
 * 渲染 index 文件模板
 * @param filepathOrTplStr 文件路径或者字符串
 * @param data 数据
 */
export async function renderIndexFile(filepathOrTplStr: string, data: any) {
  if (filepathOrTplStr === '') {
    throw new Error('index tpl should not be \'\'.');
  }
  const tplStr = await getIndexTpl(filepathOrTplStr);
}
