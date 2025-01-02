
/*
 * @Author: dushuai
 * @Date: 2024-01-10 18:36:07
 * @LastEditors: dushuai
 * @LastEditTime: 2024-12-24 18:37:14
 * @description: build
 */
const esbuild = require('esbuild');
// import { build, Charset, context, PluginBuild } from 'esbuild';
const esbuildGlob = require('esbuild-plugin-glob');

type FORMAT = 'cjs' | 'esm';

const { build } = esbuild;
const { globPlugin } = esbuildGlob;

console.log('\x1b[31mBuilding...\x1b[0m');

async function bundle(format: FORMAT) {
  const outdir = format === 'esm' ? 'es' : 'lib';
  const finish = () => console.log('\x1b[32mBuild catalogue finished:', `${outdir}!\x1b[0m`);

  const options = {
    format,
    bundle: true,
    target: 'es2015',
    charset: 'utf8',
    external: [
      'turboutils',
      '@tarojs',
      'react',
      'react-dom',
      'react-router-dom',
      'ahooks',
      'dayjs',
      'zustand'
    ],
    outdir,
    entryPoints: ['./src/**/*.ts'],
    outbase: './src',
    minify: true,
    treeShaking: true,
    plugins: [globPlugin()]
  };

  await build(options);
  finish();
}

bundle('esm');
bundle('cjs');
