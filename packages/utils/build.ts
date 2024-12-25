/*
 * @Author: dushuai
 * @Date: 2024-01-10 18:36:07
 * @LastEditors: dushuai
 * @LastEditTime: 2024-12-24 18:37:14
 * @description: build
 */
const esbuild = require('esbuild');
// import { build, Charset, context, PluginBuild } from 'esbuild';

type FORMAT = 'cjs' | 'esm';

console.log('Building...');

const { build, context } = esbuild;

async function bundle(format: FORMAT) {
  const ext = format === 'esm' ? '.mjs' : '.js';
  const outfile = `dist/index.${format}${ext}`;
  const finish = () => console.log('Build finished:', outfile);

  const options = {
    format,
    bundle: true,
    target: ['chrome53'],
    outfile,
    // preserve Chinese character
    charset: 'utf8',
    // external: ['vue', 'keep-design'],
    entryPoints: ['./src/index.ts']
  };

  if(process.argv.includes('-w')) {
    const loggerPlugin = {
      name: 'loggerPlugin',
      setup(build: any) {
        build.onEnd(finish);
      }
    };

    const ctx = await context({
      ...options,
      plugins: [loggerPlugin]
    });

    await ctx.watch();
  } else {
    await build(options);
    finish();
  }
}

bundle('esm');
bundle('cjs');
