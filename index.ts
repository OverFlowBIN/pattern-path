import * as fs from 'fs/promises';
import * as path from 'path';

export default async function patternPath(
  directory: string,
  pattern: RegExp
): Promise<string[]> {
  let results: string[] = [];

  async function searchDirectory(currentDirectory: string) {
    const files = await fs.readdir(currentDirectory);

    for (const file of files) {
      const fullPath = path.join(currentDirectory, file);
      const stat = await fs.stat(fullPath);

      if (stat.isDirectory()) {
        await searchDirectory(fullPath);
      } else if (stat.isFile() && pattern.test(file)) {
        results.push(fullPath);
      }
    }
  }

  await searchDirectory(directory);

  return results;
}

export async function main() {
  const files = await patternPath('.', /\.ts$/);
  console.log(files);
}
main();
