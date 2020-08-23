/*
 * @Author: xiuquanxu
 * @Company: kaochong
 * @Date: 2020-08-23 14:29:45
 * @LastEditors: xiuquanxu
 * @LastEditTime: 2020-08-23 14:55:04
 */
class JsParse {
  private keyWords: Map<string, string> = new Map();
  constructor() {
    this.initKeyWords();
  }

  public 

  private initKeyWords() {
    this.keyWords.set('const', 'const');
    this.keyWords.set('let', 'let');
    this.keyWords.set('function', 'function');
    this.keyWords.set('break', 'break');
    this.keyWords.set('while', 'while');
    this.keyWords.set('var', 'var');
    this.keyWords.set('this', 'this'); 
  }
}