/*
 * @Author: xiuquanxu
 * @Company: kaochong
 * @Date: 2020-08-23 15:02:34
 * @LastEditors: xiuquanxu
 * @LastEditTime: 2020-08-25 12:08:13
 */
enum CodeType {
  KeyWords = 'KeyWords', // 关键字
  Variable = 'Variable', // 变量
  Symbol = 'Symbol', // 符号
  Str = 'Str', // 字符串
  Attribute = 'Attribute', // 属性
}

type VNode = {
  CodeType: CodeType,
  txt: string,
};

export { CodeType, VNode }