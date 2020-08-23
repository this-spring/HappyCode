/*
 * @Author: xiuquanxu
 * @Company: kaochong
 * @Date: 2020-08-23 15:02:34
 * @LastEditors: xiuquanxu
 * @LastEditTime: 2020-08-23 15:27:01
 */
enum CodeType {
  KeyWords = 'KeyWords',
  Variable = 'Variable',
  Symbol = 'Symbol',
  Str = 'Str',
  Attribute = 'Attribute',
}

type VNode = {
  CodeType: CodeType,
  txt: string,
};

export { CodeType, VNode }