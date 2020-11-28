import chalk from 'chalk';
import * as fs from 'fs-extra';
import * as glob from 'glob';
import * as path from 'path';

/**
 * CLI arguments for `generate` command.
 */
interface GenerateOptions {
  src?: string;
  dest?: string;
}

/**
 * Generate sqlite build file.
 *
 * @param options CLI options.
 */
export function generate(options: GenerateOptions): void {
  const src: string = options.src || 'src/sqlite/**/*.sql';
  const dest: string = options.dest || 'www/build/sqlite.js';

  const files: string[] = glob.sync(src);
  let output = '';

  files.forEach((file) => {
    const { name, content } = parseFile(file);
    output += `window._sqlite['${name}'] = ${content};\n`;
  });

  output = `(function (window) {
    window._sqlite = {};
    ${output}
  })(window);`;

  fs.outputFileSync(dest, output);
  console.log(chalk.green('Build file generated!'));
}

/**
 * Transform a potentially formatted SQL file into a single string.
 *
 * @param file Path to sql file.
 */
function parseFile(file: string): { name: string; content: string } {
  const filename: string = path.basename(file);
  const name: string = filename.substring(0, filename.indexOf('.'));
  let content: string = fs.readFileSync(file, 'utf8');

  content =
    content
      .replace(/^\uFEFF/, '')
      .split(/^/gm)
      .map((line) => JSON.stringify(line.replace(/(\r\n|\n|\r)/g, '') + ' '))
      .filter((line) => !/^"([\s]*)"$/.test(line))
      .join(' +\n')
      .replace(/(\\t)/g, '  ')
      .trim() || '""';

  return {
    name,
    content,
  };
}
