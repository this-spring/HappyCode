/*
 * @Author: xiuquanxu
 * @Company: kaochong
 * @Date: 2020-08-30 00:06:05
 * @LastEditors: xiuquanxu
 * @LastEditTime: 2020-08-30 02:40:28
 */
import { uglify } from 'rollup-plugin-uglify';
import typescript from 'rollup-plugin-typescript2';
import serve from 'rollup-plugin-serve';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import path from 'path';

const resolveFile = function (filePath) {
    return path.join(__dirname, '.', filePath)
}
export default {
    input: 'src/index.ts',
    output: {
        file: `dist/HappyCode.min.js`,
        format: 'umd',
        name: 'HappyCode',
        sourceMap: true,
    },
    plugins: [
        uglify(),
        resolve(),
        commonjs({}),
        typescript({
            tsconfig: './tsconfig.json',
            verbosity: 3,
        }),
        serve({
            host: '127.0.0.1',
            port: 8083,
            contentBase: [resolveFile('/test'), resolveFile('/dist')]
        }),
    ],
};