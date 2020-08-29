/*
 * @Author: xiuquanxu
 * @Company: kaochong
 * @Date: 2020-08-23 15:02:34
 * @LastEditors: xiuquanxu
 * @LastEditTime: 2020-08-29 14:54:21
 */
enum CodeType {
  KeyWords = 'KeyWords', // 关键字
  Variable = 'Variable', // 变量
  Symbol = 'Symbol', // 符号
  Str = 'Str', // 字符串
  Attribute = 'Attribute', // 属性
  Other = 'Other', // 换行
  Default = 'Default',
}

enum CssStyleType {
  KeyWords = 'KeyWords', // 关键字
  Variable = 'Variable', // 变量
  SymbolS = 'SymbolS', // 符号
  Str = 'Str', // 字符串
  Attribute = 'Attribute', // 属性
  Other = 'Other', // 换行
  Default = 'Default',
}

type VNode = {
  CodeType: CodeType,
  Token: string,
};

type CssNode = {
  vn: VNode,
  cssClass: CssStyleType,
}

export { CodeType, CssStyleType, CssNode, VNode }