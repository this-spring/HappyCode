/*
 * @Author: xiuquanxu
 * @Company: kaochong
 * @Date: 2020-08-25 13:52:27
 * @LastEditors: xiuquanxu
 * @LastEditTime: 2020-08-25 13:56:17
 */
module.exports = {
    roots: [
        "<rootDir>/test"
    ],
    testRegex: 'test/(.+)\\.test\\.(jsx?|tsx?)$',
    transform: {
        "^.+\\.tsx?$": "ts-jest"
    },
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
};