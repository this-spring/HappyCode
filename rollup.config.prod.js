/*
 * @Author: xiuquanxu
 * @Company: kaochong
 * @Date: 2020-08-30 00:06:05
 * @LastEditors: xiuquanxu
 * @LastEditTime: 2020-08-30 02:40:42
 */
import { uglify } from 'rollup-plugin-uglify';
import typescript from 'rollup-plugin-typescript2';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs'  

export default {
    input: 'src/index.ts',
    output: {
        file: `dist/HappyCode.min.js`,
        format: 'umd',
        name: 'HappyCode',
        sourceMap: false,
    },
    plugins: [
        resolve(),
        uglify(),
        commonjs({}),
        typescript({
            tsconfig: './tsconfig.json',
            verbosity: 3,
        }),
    ],
};