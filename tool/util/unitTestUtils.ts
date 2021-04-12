import { exists } from 'std/fs/mod.ts';

/**
 * 获取要测试的文件
 * @TODO 做依赖分析
 * @param paths 传入路径
 */
export async function getTestFiles(paths: string[]) {
  const testFiles: string[] = [];
  for (const subPath of paths) {
    // 如果 test.ts 文件，是一定要变的
    if (/test\.ts$/.test(subPath)) {
      testFiles.push(subPath);
    }
    const testPath = subPath.replace('.ts', '.test.ts');
    if (await exists(testPath)) {
      testFiles.push(testPath);
    }
  }
  return testFiles;
}

export async function runTests(testFiles: string[]) {
  const cmd = [
    'deno',
    'test',
    '--unstable',
    '--allow-all',
    '--import-map=./importMap.json',
    ...testFiles,
  ];
  console.log(cmd.join(' '));
  const p = Deno.run({ cmd });
  await p.status();
}
